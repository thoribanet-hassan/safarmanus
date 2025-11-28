import os
import json
from openai import OpenAI

# Load API Key from environment variable
# The key is now securely stored in the backend's .env file, but for a standalone script, 
# we'll assume it's available in the environment for testing.
# In a real scenario, this script would be part of the secure backend.
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    print("Error: OPENAI_API_KEY environment variable not set.")
    # Use a placeholder if the key is not available for demonstration
    # In a real environment, this would fail.
    OPENAI_API_KEY = "placeholder" 

client = OpenAI(api_key=OPENAI_API_KEY)

def check_flight_quality(flight_data: dict) -> dict:
    """
    Uses the OpenAI model to analyze flight data and provide a quality score 
    and a detailed report for 'real inspection'.

    Args:
        flight_data: A dictionary containing flight details (e.g., price, 
                     duration, layovers, airline, departure time).

    Returns:
        A dictionary with the quality score and a detailed report.
    """
    
    # Define the system prompt for the AI model
    system_prompt = (
        "أنت خبير في تحليل جودة عروض رحلات الطيران. مهمتك هي فحص بيانات رحلة "
        "وتقديم تقرير مفصل يتضمن درجة جودة من 1 إلى 100. "
        "يجب أن تعتمد الدرجة على: السعر (مقارنة بالمتوسط)، مدة الرحلة، عدد التوقفات، "
        "سمعة شركة الطيران، وتوقيت المغادرة/الوصول. "
        "أجب بصيغة JSON فقط."
    )

    # Convert flight data to a readable string for the model
    user_prompt = f"قم بتحليل جودة عرض الرحلة التالي:\n{json.dumps(flight_data, indent=2, ensure_ascii=False)}"

    # Define the expected JSON output structure
    json_schema = {
        "type": "object",
        "properties": {
            "quality_score": {"type": "integer", "description": "درجة الجودة من 1 إلى 100."},
            "price_analysis": {"type": "string", "description": "تحليل السعر (هل هو جيد، متوسط، مرتفع؟)."},
            "duration_analysis": {"type": "string", "description": "تحليل مدة الرحلة والتوقفات."},
            "airline_reputation": {"type": "string", "description": "تقييم لسمعة شركة الطيران."},
            "final_recommendation": {"type": "string", "description": "توصية نهائية (شراء، انتظار، رفض)."}
        },
        "required": ["quality_score", "price_analysis", "duration_analysis", "airline_reputation", "final_recommendation"]
    }

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini", # Using a fast, capable model for this task
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.2
        )

        # Parse the JSON response
        report_json = json.loads(response.choices[0].message.content)
        return report_json

    except Exception as e:
        print(f"An error occurred during AI model call: {e}")
        return {
            "quality_score": 0,
            "price_analysis": "فشل التحليل بسبب خطأ في الاتصال بالنموذج.",
            "duration_analysis": "فشل التحليل.",
            "airline_reputation": "فشل التحليل.",
            "final_recommendation": "فشل التحليل."
        }

# --- مثال للاستخدام ---
if __name__ == "__main__":
    # مثال لبيانات رحلة (مستمدة من Amadeus أو أي مصدر آخر)
    sample_flight = {
        "origin": "RUH",
        "destination": "DXB",
        "price": 450,
        "currency": "USD",
        "duration": "4h 30m",
        "layovers": 0,
        "airline": "Saudia",
        "departure_time": "2025-12-10T10:00:00",
        "average_market_price": 600,
        "is_direct": True
    }

    print("--- بدء فحص جودة الرحلة الحقيقي ---")
    
    # Set the API key for the script's environment for testing
    # In a real application, this would be handled by the backend environment
    os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

    report = check_flight_quality(sample_flight)

    print("\n--- تقرير فحص جودة الرحلة ---")
    print(json.dumps(report, indent=4, ensure_ascii=False))
    print("-----------------------------------")
    print(f"الدرجة النهائية: {report.get('quality_score', 'N/A')}/100")
    print(f"التوصية: {report.get('final_recommendation', 'N/A')}")
