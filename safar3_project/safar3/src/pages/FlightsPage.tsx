import { useState } from 'react';
import { Search, Loader, MessageSquare, Sparkles, Target, Bell, ArrowRight, Plane, Hotel, Package, Diamond, User, Compass } from 'lucide-react';
import { useLanguage} from '../contexts/LanguageContext';
import { searchFlights, createAlert } from '../services/backendAPI';
import './FlightsPage.css';

// Mock Data for Exclusive Destinations
const mockDestinations = [
    { name: 'Amalfi Coast', price: 350, image: 'https://picsum.photos/id/1015/300/200' },
    { name: 'Dubai', price: 479, image: 'https://picsum.photos/id/1016/300/200' },
    { name: 'Kyoto', price: 799, image: 'https://picsum.photos/id/1018/300/200' },
    { name: 'Minoali', price: 499, image: 'https://picsum.photos/id/1019/300/200' },
    { name: 'Vanceoli', price: 699, image: 'https://picsum.photos/id/1020/300/200' },
    { name: 'Eimranga', price: 7100, image: 'https://picsum.photos/id/1021/300/200' },
];

type TripType = 'one-way' | 'round-trip' | 'multi-city';

export const FlightsPage = () => {
    const { t } = useLanguage();
    const [tripType, setTripType] = useState<TripType>('round-trip');
    const [searchParams, setSearchParams] = useState<any>({
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        adults: 1,
        cabinClass: 'ECONOMY'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);

    // --- Classic Search Logic ---
    const handleSearch = async () => {
        if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
            setError(t('please_fill_all_fields'));
            return;
        }

        setIsLoading(true);
        setError('');
        setResults([]);

        try {
            const response = await searchFlights(searchParams);
            const data = response?.data || [];
            if (data.length === 0) {
                setError(t('service_suspended'));
            } else {
                setResults(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : t('service_suspended'));
        } finally {
            setIsLoading(false);
        }
    };

    // --- Header Component (Integrated for simplicity) ---
    const Header = () => (
        <header className="premium-header">
            <div className="logo">
                <Plane size={32} color="var(--color-primary)" />
                <span className="logo-text">SAFAR</span>
            </div>
            <nav className="nav-links">
                <a href="#" className="nav-link"><Compass size={18} /> Explore</a>
                <a href="#" className="nav-link"><Diamond size={18} /> Premium Access</a>
                <a href="#" className="nav-link"><Bell size={18} /> Concierge</a>
                <a href="#" className="nav-link"><User size={18} /></a>
            </nav>
        </header>
    );

    // --- Search Bar Component ---
    const SearchBar = () => (
        <div className="premium-search-bar">
            <div className="search-input-group">
                <Search size={24} color="var(--color-primary)" />
                <input
                    type="text"
                    className="input-premium"
                    placeholder="Search Flights, Hotels, Packages..."
                    // This is a simplified input for the design, actual search logic is below
                />
            </div>
            <button className="btn btn-primary-premium search-btn" onClick={handleSearch}>
                Search
            </button>
        </div>
    );

    // --- Exclusive Destinations Component ---
    const ExclusiveDestinations = () => (
        <div className="exclusive-destinations">
            <h2 className="section-title">EXCLUSIVE DESTINATIONS</h2>
            <div className="destinations-grid">
                {mockDestinations.map((dest, index) => (
                    <div key={index} className="destination-card">
                        <img src={dest.image} alt={dest.name} />
                        <div className="destination-info">
                            <h3>{dest.name}</h3>
                            <div className="price">${dest.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flights-page premium-dark-theme">
            <Header />
            <div className="flights-content container">
                <SearchBar />
                
                {/* The rest of the original search form is hidden for the premium design look */}
                {/* You can uncomment the original form for full functionality */}
                
                {/* Exclusive Destinations Section */}
                <ExclusiveDestinations />

                <h2 className="journey-in-style">JOURNEY IN STYLE</h2>

                {/* Display Results or Error Messages */}
                {error && (
                    <div className="error-message glass-card animate-fade-in">
                        <p>⚠️ {error}</p>
                    </div>
                )}

                {results.length > 0 && (
                    <div className="results-container">
                        <h2>{t('search_results')} ({results.length})</h2>
                        <div className="results-grid">
                            {results.map((offer) => (
                                <div key={offer.id} className="flight-card glass-card animate-fade-in">
                                    <div className="flight-header">
                                        <div className="price">
                                            {offer.price.total} {offer.price.currency}
                                        </div>
                                        <button className="btn btn-sm btn-primary">{t('book')}</button>
                                    </div>
                                    <div className="flight-segments">
                                        {offer.itineraries[0].segments.map((segment: any, idx: number) => (
                                            <div key={idx} className="segment">
                                                <span>{segment.departure.iataCode}</span>
                                                <ArrowRight size={16} />
                                                <span>{segment.arrival.iataCode}</span>
                                                <span className="text-xs text-gray-400">({segment.carrierCode} {segment.number})</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
