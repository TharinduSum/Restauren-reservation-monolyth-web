import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const menuItems = {
    starters: [
        {
            name: 'Crispy Spring Rolls',
            description: 'Golden fried vegetables with sweet chili sauce',
            price: '$12',
        },
        {
            name: 'Thai Coconut Soup',
            description: 'Creamy coconut broth with lemongrass',
            price: '$14',
        },
        {
            name: 'Vietnamese Fresh Rolls',
            description: 'Shrimp, herbs, rice vermicelli',
            price: '$15',
        },
        {
            name: 'Edamame',
            description: 'Steamed soybeans with sea salt',
            price: '$9',
        },
    ],
    mains: [
        {
            name: 'Truffle Peking Duck',
            description: 'Crispy duck with truffle hoisin glaze',
            price: '$48',
        },
        {
            name: 'Wagyu Beef Tataki',
            description: 'Seared wagyu with ponzu dressing',
            price: '$52',
        },
        {
            name: 'Lobster Thermidor',
            description: 'Baked lobster with cognac cream',
            price: '$58',
        },
        {
            name: 'Miso Glazed Black Cod',
            description: 'White miso, sake, ginger glaze',
            price: '$42',
        },
    ],
    desserts: [
        {
            name: 'Mango Sticky Rice',
            description: 'Sweet coconut sticky rice with fresh mango',
            price: '$14',
        },
        {
            name: 'Matcha Tiramisu',
            description: 'Japanese-Italian fusion dessert',
            price: '$16',
        },
        {
            name: 'Passion Fruit Crème Brûlée',
            description: 'Tahitian vanilla custard',
            price: '$15',
        },
        {
            name: 'Sesame Panna Cotta',
            description: 'Black sesame with ginger caramel',
            price: '$13',
        },
    ],
    drinks: [
        {
            name: 'Sakura Martini',
            description: 'Cherry blossom vodka, elderflower',
            price: '$18',
        },
        {
            name: 'Yuzu Sparkling',
            description: 'Fresh yuzu, sparkling water, mint',
            price: '$12',
        },
        {
            name: 'Jasmine Iced Tea',
            description: 'House-brewed jasmine tea',
            price: '$8',
        },
        {
            name: 'Sake Flight',
            description: 'Curated selection of premium sakes',
            price: '$28',
        },
    ],
};

const galleryImages = [
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1580442451756-4e7ce18a5b49?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop',
];

const testimonials = [
    {
        name: 'James Chen',
        rating: 5,
        text: 'An extraordinary culinary journey. The Peking Duck was absolutely divine, reminiscent of the finest restaurants in Beijing.',
    },
    {
        name: 'Sarah Williams',
        rating: 5,
        text: 'Impeccable service and stunning ambiance. The tasting menu took my breath away. A true gem in the city.',
    },
    {
        name: 'Michael Park',
        rating: 5,
        text: 'Finally, authentic Asian fine dining that exceeds expectations. Every dish tells a story of tradition and innovation.',
    },
];

export default function AsianFood() {
    const [activeCategory, setActiveCategory] = useState('starters');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
    });
    const [submitted, setSubmitted] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: '2',
                });
                setTimeout(() => setSubmitted(false), 5000);
            }
        } catch (error) {
            console.error('Reservation failed:', error);
        }
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head title="Asian Food - Fine Dining Experience">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#fffdf9]">
                {/* Navigation */}
                <nav className="fixed top-0 right-0 left-0 z-50 border-b border-[#f5f0e8] bg-[#fffdf9]/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <span className="font-serif text-2xl font-semibold text-[#2d2a26]">
                            Asian Food
                        </span>
                        <div className="hidden items-center gap-8 md:flex">
                            <button
                                onClick={() => scrollToSection('about')}
                                className="text-sm font-medium text-[#5a5550] transition-colors hover:text-[#2d2a26]"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection('menu')}
                                className="text-sm font-medium text-[#5a5550] transition-colors hover:text-[#2d2a26]"
                            >
                                Menu
                            </button>
                            <button
                                onClick={() => scrollToSection('gallery')}
                                className="text-sm font-medium text-[#5a5550] transition-colors hover:text-[#2d2a26]"
                            >
                                Gallery
                            </button>
                            <button
                                onClick={() => scrollToSection('testimonials')}
                                className="text-sm font-medium text-[#5a5550] transition-colors hover:text-[#2d2a26]"
                            >
                                Reviews
                            </button>
                            <button
                                onClick={() => scrollToSection('location')}
                                className="text-sm font-medium text-[#5a5550] transition-colors hover:text-[#2d2a26]"
                            >
                                Location
                            </button>
                            <Button
                                onClick={() => scrollToSection('reservation')}
                                className="rounded-full bg-[#2d2a26] px-6 text-white hover:bg-[#1a1816]"
                            >
                                Reserve
                            </Button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative flex h-screen items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url(https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&h=1080&fit=crop)',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                        <div className="animate-fade-in animation-delay-200 opacity-0">
                            <span className="mb-6 inline-block text-sm tracking-[0.3em] text-[#d4a574] uppercase">
                                Fine Dining Experience
                            </span>
                        </div>
                        <h1 className="animate-slide-up animation-delay-300 mb-6 font-serif text-5xl text-white opacity-0 md:text-7xl lg:text-8xl">
                            Asian Food
                        </h1>
                        <p className="animate-slide-up animation-delay-400 mb-10 text-xl font-light text-white/90 opacity-0 md:text-2xl">
                            Experience the Taste of Authentic Asia
                        </p>
                        <div className="animate-fade-in animation-delay-500 opacity-0">
                            <Button
                                onClick={() => scrollToSection('reservation')}
                                size="lg"
                                className="rounded-full bg-[#d4a574] px-10 py-6 text-lg font-medium text-white shadow-lg hover:bg-[#c9956c]"
                            >
                                Reserve a Table
                            </Button>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <svg
                            className="h-6 w-6 text-white/70"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="bg-[#faf8f5] py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid items-center gap-16 md:grid-cols-2">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 h-full w-full rounded-lg border-2 border-[#d4a574]" />
                                <img
                                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=800&fit=crop"
                                    alt="Restaurant interior"
                                    className="relative z-10 h-[500px] w-full rounded-lg object-cover shadow-xl"
                                />
                            </div>
                            <div>
                                <span className="text-sm tracking-[0.2em] text-[#d4a574] uppercase">
                                    Our Story
                                </span>
                                <h2 className="mt-4 mb-8 font-serif text-4xl text-[#2d2a26] md:text-5xl">
                                    Where Tradition Meets Innovation
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-[#5a5550]">
                                    Nestled in the heart of the city, Asian Food
                                    has been serving exceptional pan-Asian
                                    cuisine since 2010. Our master chefs bring
                                    decades of experience from the streets of
                                    Bangkok, the kitchens of Tokyo, and the dim
                                    sum houses of Hong Kong.
                                </p>
                                <p className="mb-8 text-lg leading-relaxed text-[#5a5550]">
                                    We believe that every dish should tell a
                                    story — of ancient recipes passed down
                                    through generations, of the finest
                                    ingredients sourced from across Asia, and of
                                    an unwavering commitment to culinary
                                    excellence.
                                </p>
                                <div className="flex gap-8">
                                    <div>
                                        <span className="font-serif text-4xl font-semibold text-[#d4a574]">
                                            15+
                                        </span>
                                        <p className="mt-1 text-sm text-[#5a5550]">
                                            Years of Excellence
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-serif text-4xl font-semibold text-[#d4a574]">
                                            3
                                        </span>
                                        <p className="mt-1 text-sm text-[#5a5550]">
                                            Michelin Stars
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-serif text-4xl font-semibold text-[#d4a574]">
                                            50k+
                                        </span>
                                        <p className="mt-1 text-sm text-[#5a5550]">
                                            Happy Guests
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Menu Section */}
                <section id="menu" className="bg-[#fffdf9] py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-16 text-center">
                            <span className="text-sm tracking-[0.2em] text-[#d4a574] uppercase">
                                Culinary Creations
                            </span>
                            <h2 className="mt-4 font-serif text-4xl text-[#2d2a26] md:text-5xl">
                                Our Menu
                            </h2>
                        </div>

                        <div className="mb-12 flex flex-wrap justify-center gap-4">
                            {Object.keys(menuItems).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                                        activeCategory === category
                                            ? 'bg-[#2d2a26] text-white shadow-lg'
                                            : 'bg-[#f5f0e8] text-[#5a5550] hover:bg-[#e8e2d8]'
                                    }`}
                                >
                                    {category.charAt(0).toUpperCase() +
                                        category
                                            .slice(1)
                                            .replace(/([A-Z])/g, ' $1')}
                                </button>
                            ))}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {menuItems[
                                activeCategory as keyof typeof menuItems
                            ].map((item, index) => (
                                <Card
                                    key={item.name}
                                    className="cursor-default border-none bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <CardContent className="flex items-start justify-between gap-4 p-6">
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-serif text-xl text-[#2d2a26]">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-[#8a8580]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <span className="text-lg font-semibold whitespace-nowrap text-[#d4a574]">
                                            {item.price}
                                        </span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reservation Section */}
                <section
                    id="reservation"
                    className="bg-[#2d2a26] py-24 md:py-32"
                >
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="mb-16 text-center">
                            <span className="text-sm tracking-[0.2em] text-[#d4a574] uppercase">
                                Book Your Table
                            </span>
                            <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
                                Make a Reservation
                            </h2>
                            <p className="mt-4 text-lg text-white/70">
                                Join us for an unforgettable dining experience
                            </p>
                        </div>

                        <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                            <CardContent className="p-8 md:p-12">
                                {submitted ? (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4a574]">
                                            <svg
                                                className="h-8 w-8 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 font-serif text-2xl text-white">
                                            Reservation Submitted
                                        </h3>
                                        <p className="text-white/70">
                                            We'll confirm your table shortly via
                                            email.
                                        </p>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm text-white/80">
                                                    Full Name
                                                </label>
                                                <Input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm text-white/80">
                                                    Email
                                                </label>
                                                <Input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-6 md:grid-cols-3">
                                            <div>
                                                <label className="mb-2 block text-sm text-white/80">
                                                    Phone
                                                </label>
                                                <Input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            phone: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm text-white/80">
                                                    Date
                                                </label>
                                                <Input
                                                    type="date"
                                                    required
                                                    value={formData.date}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            date: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm text-white/80">
                                                    Time
                                                </label>
                                                <Input
                                                    type="time"
                                                    required
                                                    value={formData.time}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            time: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm text-white/80">
                                                Number of Guests
                                            </label>
                                            <select
                                                value={formData.guests}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        guests: e.target.value,
                                                    })
                                                }
                                                className="h-12 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-white"
                                            >
                                                {[
                                                    1, 2, 3, 4, 5, 6, 7, 8, 10,
                                                    12,
                                                ].map((num) => (
                                                    <option
                                                        key={num}
                                                        value={num}
                                                        className="text-[#2d2a26]"
                                                    >
                                                        {num}{' '}
                                                        {num === 1
                                                            ? 'Guest'
                                                            : 'Guests'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="h-14 w-full rounded-lg bg-[#d4a574] text-lg font-medium text-white hover:bg-[#c9956c]"
                                        >
                                            Confirm Reservation
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="gallery" className="bg-[#faf8f5] py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-16 text-center">
                            <span className="text-sm tracking-[0.2em] text-[#d4a574] uppercase">
                                Visual Journey
                            </span>
                            <h2 className="mt-4 font-serif text-4xl text-[#2d2a26] md:text-5xl">
                                Our Gallery
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                            {galleryImages.map((src, index) => (
                                <div
                                    key={index}
                                    className={`group overflow-hidden rounded-lg shadow-md ${
                                        index % 3 === 0 ? 'md:col-span-2' : ''
                                    }`}
                                >
                                    <img
                                        src={src}
                                        alt={`Gallery ${index + 1}`}
                                        className="h-48 w-full transform object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section
                    id="testimonials"
                    className="bg-[#fffdf9] py-24 md:py-32"
                >
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="mb-16 text-center">
                            <span className="text-sm tracking-[0.2em] text-[#d4a574] uppercase">
                                Guest Experiences
                            </span>
                            <h2 className="mt-4 font-serif text-4xl text-[#2d2a26] md:text-5xl">
                                What Our Guests Say
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-500 ${
                                            index === currentTestimonial
                                                ? 'translate-x-0 opacity-100'
                                                : 'absolute inset-0 translate-x-full opacity-0'
                                        }`}
                                    >
                                        <Card className="border-none bg-white shadow-xl">
                                            <CardContent className="p-10 text-center">
                                                <div className="mb-6 flex justify-center gap-1">
                                                    {[
                                                        ...Array(
                                                            testimonial.rating,
                                                        ),
                                                    ].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="h-5 w-5 text-[#d4a574]"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="mb-8 text-lg leading-relaxed text-[#5a5550] italic">
                                                    "{testimonial.text}"
                                                </p>
                                                <p className="font-serif text-xl font-medium text-[#2d2a26]">
                                                    {testimonial.name}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-center gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentTestimonial(index)
                                        }
                                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                            index === currentTestimonial
                                                ? 'w-8 bg-[#d4a574]'
                                                : 'bg-[#d4a574]/30 hover:bg-[#d4a574]/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location Section */}
                <section id="location" className="bg-[#2d2a26] py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-16 md:grid-cols-2">
                            <div>
                                <span className="text-sm tracking-[0.2em] text-[#d4a574] uppercase">
                                    Find Us
                                </span>
                                <h2 className="mt-4 mb-8 font-serif text-4xl text-white md:text-5xl">
                                    Location & Contact
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 font-medium text-white">
                                            Address
                                        </h3>
                                        <p className="text-white/70">
                                            123 Culinary Avenue
                                            <br />
                                            Downtown District
                                            <br />
                                            New York, NY 10001
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-medium text-white">
                                            Phone
                                        </h3>
                                        <p className="text-white/70">
                                            +1 (555) 123-4567
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-medium text-white">
                                            Email
                                        </h3>
                                        <p className="text-white/70">
                                            reservations@asianfood.com
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-medium text-white">
                                            Opening Hours
                                        </h3>
                                        <p className="text-white/70">
                                            Monday - Thursday: 5:00 PM - 10:00
                                            PM
                                            <br />
                                            Friday - Saturday: 5:00 PM - 11:00
                                            PM
                                            <br />
                                            Sunday: 4:00 PM - 9:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-lg bg-[#f5f0e8] shadow-xl">
                                <div className="flex h-[400px] w-full items-center justify-center bg-[#e8e2d8]">
                                    <div className="p-8 text-center">
                                        <svg
                                            className="mx-auto mb-4 h-16 w-16 text-[#d4a574]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <p className="text-[#5a5550]">
                                            Map View
                                        </p>
                                        <p className="mt-2 text-sm text-[#8a8580]">
                                            Interactive map embedded here
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#1a1816] py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div className="text-center md:text-left">
                                <span className="font-serif text-2xl font-semibold text-white">
                                    Asian Food
                                </span>
                                <p className="mt-2 text-sm text-white/60">
                                    Fine Dining Experience
                                </p>
                            </div>

                            <div className="flex gap-6">
                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#d4a574]"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#d4a574]"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#d4a574]"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-8 text-center">
                            <p className="text-sm text-white/40">
                                © 2026 Asian Food. All rights reserved. Crafted
                                with passion.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
