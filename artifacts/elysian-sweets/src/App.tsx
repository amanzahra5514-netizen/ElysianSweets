import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  ExternalLink,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Plus,
  Quote,
  Star,
  Truck,
  Utensils,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Category = 'All' | 'Sweets' | 'Savoury' | 'Bakes' | 'Drinks';
type OrderMode = 'pickup' | 'delivery';

const menuItems = [
  { id: 'signature-sundae', category: 'Sweets' as const, name: 'Elysian Sundae', note: 'Vanilla bean, fudge ribbon, roasted nuts', price: 'Rs 690', tone: 'rose', badge: 'House favourite' },
  { id: 'pistachio-kunafa', category: 'Sweets' as const, name: 'Pistachio Kunafa', note: 'Crisp kataifi, soft cheese, orange blossom', price: 'Rs 520', tone: 'lime', badge: 'New' },
  { id: 'chocolate-lava', category: 'Sweets' as const, name: 'Midnight Lava Cake', note: 'Warm chocolate centre, vanilla scoop', price: 'Rs 580', tone: 'cocoa', badge: 'Best seller' },
  { id: 'four-cheese-pizza', category: 'Savoury' as const, name: 'Four Cheese Pizza', note: 'Mozzarella, cheddar, gouda, parmesan', price: 'Rs 1,490', tone: 'gold', badge: 'Fan pick' },
  { id: 'chicken-enchilada', category: 'Savoury' as const, name: 'Chicken Enchilada', note: 'Smoky salsa, pulled chicken, melted cheese', price: 'Rs 990', tone: 'tomato', badge: 'Comfort food' },
  { id: 'cream-lasagna', category: 'Savoury' as const, name: 'Creamy Chicken Lasagna', note: 'Slow-cooked sauce, herbs, golden cheese', price: 'Rs 1,190', tone: 'sage', badge: 'Reviewers love it' },
  { id: 'lotus-cheesecake', category: 'Bakes' as const, name: 'Lotus Cheesecake', note: 'Caramel biscuit, cream cheese, soft crumb', price: 'Rs 620', tone: 'biscuit', badge: 'Sweet tooth' },
  { id: 'red-velvet', category: 'Bakes' as const, name: 'Red Velvet Slice', note: 'Silky cream cheese frosting, cocoa crumb', price: 'Rs 420', tone: 'red', badge: 'Classic' },
  { id: 'mango-fizz', category: 'Drinks' as const, name: 'Mango Fizz', note: 'Chilled mango, citrus, sparkling finish', price: 'Rs 320', tone: 'mango', badge: 'Cold & bright' },
];

const testimonials = [
  { quote: 'The kind of place where dinner quietly turns into dessert and nobody wants to leave.', name: 'A local regular', detail: 'Jhang food guide' },
  { quote: 'Pizza, enchilada and lasagna all arrived hot. The sweet finish made the whole table happy.', name: 'Verified diner', detail: 'Foodpanda review' },
  { quote: 'A warm family stop at LDS Mall — easy to find, easy to love, and open late enough for cravings.', name: 'Weekend visitor', detail: 'Google review' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo() {
  return (
    <a href="#top" className="focus-ring flex items-center gap-3" data-testid="link-logo">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--accent))]">
        <span className="serif text-xl font-bold">E</span>
      </span>
      <span className="leading-none">
        <span className="serif block text-[1.38rem] font-semibold tracking-[-.03em]">Elysian</span>
        <span className="mono block text-[.56rem] uppercase tracking-[.25em] text-[hsl(var(--primary))]">Sweets &amp; more</span>
      </span>
    </a>
  );
}

function HeroArtwork() {
  return (
    <div className="relative mx-auto aspect-[.88] w-full max-w-[520px]" aria-label="Illustration of a dessert table">
      <div className="absolute left-[8%] top-[7%] h-14 w-14 rounded-full border border-[hsl(var(--foreground)/.18)] bg-[hsl(var(--accent))] shadow-[10px_12px_0_hsl(var(--secondary)/.1)] animate-float" />
      <div className="absolute right-[8%] top-[19%] h-9 w-9 rounded-full border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--primary))] animate-float delay-3" />
      <div className="absolute inset-[8%_5%_12%] rotate-[-7deg] rounded-[48%_52%_45%_50%] bg-[hsl(var(--secondary))] shadow-[18px_22px_0_hsl(var(--primary)/.2)]" />
      <div className="absolute inset-[14%_11%_17%] overflow-hidden rounded-[45%_55%_48%_52%] bg-[linear-gradient(140deg,hsl(9_72%_67%),hsl(16_80%_49%))]">
        <div className="absolute -right-[14%] top-[7%] h-44 w-44 rounded-full border-[18px] border-[hsl(var(--accent)/.68)]" />
        <div className="absolute left-[12%] top-[12%] h-9 w-9 rounded-full bg-[hsl(var(--accent))]" />
        <div className="absolute left-[28%] top-[24%] h-5 w-5 rounded-full bg-[hsl(var(--accent)/.72)]" />
        <div className="absolute bottom-[20%] left-[16%] h-28 w-28 rounded-full bg-[hsl(38_87%_79%/.55)] blur-[1px]" />
        <div className="absolute bottom-[11%] right-[17%] h-16 w-16 rounded-full bg-[hsl(327_28%_22%/.74)]" />
        <div className="absolute bottom-[24%] right-[28%] h-8 w-8 rounded-full bg-[hsl(36_44%_95%/.9)]" />
      </div>
      <div className="absolute bottom-[9%] left-[17%] h-[17%] w-[68%] rounded-[50%] bg-[hsl(var(--accent))] shadow-[0_15px_0_hsl(var(--secondary)/.15)]" />
      <div className="absolute bottom-[12%] left-[29%] h-[13%] w-[43%] rounded-[50%] bg-[hsl(38_45%_96%)]" />
      <div className="absolute bottom-[16%] left-[34%] h-[10%] w-[34%] rounded-[50%] bg-[hsl(13_78%_56%)]" />
      <div className="absolute bottom-[20%] left-[40%] h-[7%] w-[22%] rounded-[50%] bg-[hsl(49_92%_67%)]" />
      <div className="absolute bottom-[2%] left-[3%] rotate-[-8deg] rounded-full border border-[hsl(var(--secondary)/.22)] bg-[hsl(var(--card))] px-4 py-2 mono text-[.6rem] uppercase tracking-[.18em] text-[hsl(var(--secondary))] shadow-[5px_6px_0_hsl(var(--accent))]">made for sharing</div>
      <div className="absolute right-[1%] top-[49%] flex -rotate-6 items-center gap-2 rounded-full bg-[hsl(var(--card))] px-3 py-2 text-xs font-semibold text-[hsl(var(--secondary))] shadow-[5px_5px_0_hsl(var(--primary))]">
        <Star className="h-3.5 w-3.5 fill-[hsl(var(--accent))] text-[hsl(var(--secondary))]" />
        4.9 local love
      </div>
    </div>
  );
}

function MenuArtwork({ tone }: { tone: string }) {
  return (
    <div className={`menu-art relative h-44 overflow-hidden rounded-[1.25rem] bg-${tone}`}>
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(hsl(var(--card)/.7)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="absolute left-1/2 top-1/2 h-28 w-36 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] rounded-[42%] bg-[hsl(var(--card)/.84)] shadow-[10px_12px_0_hsl(var(--secondary)/.14)]" />
      <div className="absolute left-1/2 top-1/2 h-20 w-28 -translate-x-1/2 -translate-y-1/2 rotate-[7deg] rounded-[45%] bg-[hsl(var(--primary))] shadow-[inset_0_-8px_0_hsl(var(--secondary)/.12)]" />
      <div className="absolute left-[37%] top-[31%] h-4 w-4 rounded-full bg-[hsl(var(--accent))]" />
      <div className="absolute left-[58%] top-[44%] h-3 w-3 rounded-full bg-[hsl(var(--card))]" />
      <div className="absolute left-[46%] top-[55%] h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent))]" />
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>('All');
  const [orderMode, setOrderMode] = useState<OrderMode>('pickup');
  const [notice, setNotice] = useState('');
  const [testimonial, setTestimonial] = useState(0);
  const [expandedHours, setExpandedHours] = useState(false);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3600);
  };

  const chooseOrder = (mode: OrderMode) => {
    setOrderMode(mode);
    showNotice(mode === 'pickup' ? 'Pickup selected — choose your favourites below.' : 'Delivery selected — we will bring the sweet moment to you.');
    scrollToId('menu');
  };

  const visibleItems = category === 'All' ? menuItems : menuItems.filter((item) => item.category === category);

  return (
    <div id="top" className="noise-overlay min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))]">
      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[hsl(var(--secondary))] px-5 py-3 text-sm font-medium text-[hsl(var(--secondary-foreground))] shadow-[0_12px_28px_hsl(var(--secondary)/.28)] animate-rise">
          <span className="h-2 w-2 animate-dot rounded-full bg-[hsl(var(--accent))]" />
          {notice}
        </div>
      )}

      <header className="relative z-40 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          <a href="#story" className="focus-ring text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]" data-testid="link-story">Our story</a>
          <a href="#menu" className="focus-ring text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]" data-testid="link-menu">Menu</a>
          <a href="#visit" className="focus-ring text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]" data-testid="link-visit">Find us</a>
          <a href="tel:+923401111564" className="focus-ring flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))]" data-testid="link-header-call"><Phone className="h-4 w-4" />+92 340 1111564</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => chooseOrder('pickup')} className="focus-ring hidden rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-0.5 sm:block" data-testid="button-header-order">Order a treat <ArrowUpRight className="ml-1 inline h-4 w-4" /></button>
          <button onClick={() => setMenuOpen((open) => !open)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="relative z-30 mx-5 mb-3 grid gap-1 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-md)] lg:hidden animate-rise" aria-label="Mobile navigation">
          {['story', 'menu', 'visit'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold capitalize hover:bg-[hsl(var(--muted))]" data-testid={`link-mobile-${item}`}>{item === 'visit' ? 'Find us' : `Our ${item}`}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); chooseOrder('pickup'); }} className="mt-1 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-left text-sm font-bold text-[hsl(var(--primary-foreground))]" data-testid="button-mobile-order">Order a treat <ArrowUpRight className="ml-1 inline h-4 w-4" /></button>
        </nav>
      )}

      <main>
        <section className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-20 pt-9 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pb-28 lg:pt-16">
          <div className="relative z-10">
            <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/.7)] px-3 py-2 mono text-[.62rem] uppercase tracking-[.17em] text-[hsl(var(--muted-foreground))]">
              <span className="h-2 w-2 animate-dot rounded-full bg-[hsl(var(--primary))]" /> LDS Mall · Jhang
            </div>
            <h1 className="serif text-balance animate-rise delay-1 mt-6 max-w-[690px] text-[clamp(3.6rem,10vw,7.8rem)] font-semibold leading-[.88] tracking-[-.06em] text-[hsl(var(--secondary))]">A little <em className="font-medium text-[hsl(var(--primary))]">sweetness</em> for the table.</h1>
            <p className="animate-rise delay-2 mt-7 max-w-[540px] text-lg leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-xl">Indulge in the best Sweets &amp; Desserts at Elysian Sweet — the ultimate foodie paradise.</p>
            <div className="animate-rise delay-3 mt-8 flex flex-wrap gap-3">
              <button onClick={() => chooseOrder('pickup')} className="focus-ring rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[6px_6px_0_hsl(var(--secondary))] transition-all hover:-translate-y-1 hover:shadow-[8px_9px_0_hsl(var(--secondary))]" data-testid="button-hero-pickup">Order for pickup <ArrowUpRight className="ml-1 inline h-4 w-4" /></button>
              <button onClick={() => chooseOrder('delivery')} className="focus-ring rounded-full border border-[hsl(var(--secondary))] bg-transparent px-6 py-3.5 text-sm font-bold text-[hsl(var(--secondary))] transition-colors hover:bg-[hsl(var(--accent))]" data-testid="button-hero-delivery"><Truck className="mr-2 inline h-4 w-4" />Delivery</button>
            </div>
            <div className="animate-rise delay-4 mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[hsl(var(--primary))]" /> Open until 12 am</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[hsl(var(--primary))]" /> Amir Colony, Jhang</span>
            </div>
          </div>
          <div className="animate-rise delay-2 relative lg:pt-2"><HeroArtwork /></div>
        </section>

        <div className="overflow-hidden border-y border-[hsl(var(--secondary)/.16)] bg-[hsl(var(--accent))] py-3">
          <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
            {[0, 1].map((group) => <div key={group} className="flex items-center gap-10">{['sweets worth sharing', 'late-night cravings welcome', 'made fresh in Jhang', 'come for one, stay for dessert'].map((label) => <span key={`${group}-${label}`} className="mono flex items-center gap-10 text-[.63rem] font-bold uppercase tracking-[.2em] text-[hsl(var(--secondary))]"><span>✦</span>{label}</span>)}</div>)}
          </div>
        </div>

        <section id="story" className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-12 lg:py-32">
          <div>
            <span className="mono text-[.65rem] uppercase tracking-[.24em] text-[hsl(var(--primary))]">The Elysian feeling</span>
            <h2 className="serif mt-5 max-w-md text-5xl leading-[.98] tracking-[-.045em] text-[hsl(var(--secondary))] sm:text-6xl">Your table, but <em className="text-[hsl(var(--primary))]">more memorable.</em></h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <p className="text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">Elysian Sweets is the spot for the family detour, the after-shopping reward, and the “let&apos;s just get one more thing for the table” moment.</p>
            <div className="border-l-2 border-[hsl(var(--accent))] pl-6">
              <p className="serif text-3xl leading-tight text-[hsl(var(--secondary))]">Casual visits. Small celebrations. Big cravings.</p>
              <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">At LDS Mall, Session Chowk — right where Jhang comes to slow down and catch up.</p>
            </div>
          </div>
        </section>

        <section id="menu" className="bg-[hsl(var(--secondary))] px-5 py-20 text-[hsl(var(--secondary-foreground))] sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <span className="mono text-[.65rem] uppercase tracking-[.24em] text-[hsl(var(--accent))]">Pick your mood</span>
                <h2 className="serif mt-4 text-5xl leading-[.95] tracking-[-.045em] sm:text-6xl">A menu with<br /><em className="text-[hsl(var(--primary))]">something to say.</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[hsl(var(--secondary-foreground)/.62)]">Reviewers keep coming back for our pizza, enchilada and lasagna. We say: leave room for the sweet finish.</p>
            </div>
            <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Menu categories">
              {(['All', 'Sweets', 'Savoury', 'Bakes', 'Drinks'] as Category[]).map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={`focus-ring whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${category === item ? 'bg-[hsl(var(--accent))] text-[hsl(var(--secondary))]' : 'border border-[hsl(var(--secondary-foreground)/.2)] text-[hsl(var(--secondary-foreground)/.7)] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]'}`} role="tab" aria-selected={category === item} data-testid={`tab-category-${item.toLowerCase()}`}>{item}</button>
              ))}
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item) => (
                <article key={item.id} className="menu-card elevate rounded-[1.35rem] border border-[hsl(var(--secondary-foreground)/.12)] bg-[hsl(var(--secondary-foreground)/.055)] p-3" data-testid={`card-menu-${item.id}`}>
                  <MenuArtwork tone={item.tone} />
                  <div className="px-2 pb-2 pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div><span className="mono text-[.57rem] uppercase tracking-[.15em] text-[hsl(var(--accent))]">{item.badge}</span><h3 className="serif mt-1 text-2xl leading-tight">{item.name}</h3></div>
                      <span className="mono pt-1 text-xs text-[hsl(var(--accent))]">{item.price}</span>
                    </div>
                    <p className="mt-2 text-sm text-[hsl(var(--secondary-foreground)/.58)]">{item.note}</p>
                    <button onClick={() => showNotice(`${item.name} added to your ${orderMode} order.`)} className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] transition-colors hover:text-[hsl(var(--accent))]" data-testid={`button-add-${item.id}`}>Add to order <Plus className="h-4 w-4" /></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-[hsl(var(--secondary-foreground)/.15)] pt-7 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--secondary-foreground)/.7)]"><Utensils className="h-4 w-4 text-[hsl(var(--accent))]" /> Available for pickup &amp; delivery</div>
              <button onClick={() => showNotice('Call +92 340 1111564 for today’s full menu and custom orders.')} className="focus-ring rounded-full border border-[hsl(var(--secondary-foreground)/.24)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="button-full-menu">Ask about the full menu <ArrowUpRight className="ml-1 inline h-4 w-4" /></button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <span className="mono text-[.65rem] uppercase tracking-[.24em] text-[hsl(var(--primary))]">The word on the street</span>
              <h2 className="serif mt-5 max-w-sm text-5xl leading-[.97] tracking-[-.045em] text-[hsl(var(--secondary))]">Jhang is<br /><em className="text-[hsl(var(--primary))]">talking sweet.</em></h2>
              <div className="mt-8 flex items-center gap-8">
                <div><div className="serif text-5xl text-[hsl(var(--secondary))]">4.9</div><div className="mt-1 flex gap-1" aria-label="5 out of 5 stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]" />)}</div><p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">Google · 3.8K reviews</p></div>
                <div className="h-12 w-px bg-[hsl(var(--border))]" />
                <div><div className="serif text-5xl text-[hsl(var(--secondary))]">4.2</div><div className="mt-1 flex gap-1" aria-label="4.2 out of 5 stars">{[1, 2, 3, 4].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />)}<Star className="h-3.5 w-3.5 text-[hsl(var(--accent))]" /></div><p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">Foodpanda · 448 reviews</p></div>
              </div>
            </div>
            <div className="relative min-h-[280px] rounded-[1.5rem] bg-[hsl(var(--accent))] p-8 sm:p-12">
              <Quote className="h-12 w-12 text-[hsl(var(--secondary)/.2)]" />
              <p className="serif mt-8 max-w-xl text-3xl leading-tight text-[hsl(var(--secondary))] sm:text-4xl">“{testimonials[testimonial].quote}”</p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <div><p className="text-sm font-bold text-[hsl(var(--secondary))]">{testimonials[testimonial].name}</p><p className="mt-1 text-xs text-[hsl(var(--secondary)/.6)]">{testimonials[testimonial].detail}</p></div>
                <div className="flex gap-2"><button onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)} className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--secondary)/.3)] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--accent))]" aria-label="Previous review" data-testid="button-previous-review"><ArrowDownRight className="h-4 w-4 rotate-45" /></button><button onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--accent))] transition-transform hover:-translate-y-1" aria-label="Next review" data-testid="button-next-review"><ArrowUpRight className="h-4 w-4" /></button></div>
              </div>
            </div>
          </div>
        </section>

        <section id="visit" className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <span className="mono text-[.65rem] uppercase tracking-[.24em] text-[hsl(var(--primary))]">Come find your table</span>
              <h2 className="serif mt-5 max-w-lg text-5xl leading-[.96] tracking-[-.045em] text-[hsl(var(--secondary))] sm:text-6xl">See you at<br /><em className="text-[hsl(var(--primary))]">Session Chowk.</em></h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[hsl(var(--muted-foreground))]">Inside LDS Mall, Session Chowk, Jhang Road, Amir Colony, Jhang 35200. Come hungry; leave with a new favourite.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.google.com/maps/dir/?api=1&destination=Elysian%20Sweets%20LDS%20Mall%20Jhang%20Pakistan" target="_blank" rel="noreferrer" className="focus-ring rounded-full bg-[hsl(var(--secondary))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--secondary-foreground))] transition-transform hover:-translate-y-1" data-testid="link-directions">Get directions <ExternalLink className="ml-1 inline h-4 w-4" /></a>
                <a href="tel:+923401111564" className="focus-ring rounded-full border border-[hsl(var(--border))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--secondary))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]" data-testid="link-visit-call"><Phone className="mr-2 inline h-4 w-4" />Call us</a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[hsl(var(--secondary))] p-7 text-[hsl(var(--secondary-foreground))] sm:p-10">
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-[22px] border-[hsl(var(--primary)/.35)]" />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-[hsl(var(--secondary-foreground)/.17)] pb-5"><span className="serif text-3xl">Opening hours</span><Clock3 className="h-5 w-5 text-[hsl(var(--accent))]" /></div>
                <div className="mt-6 flex items-center justify-between"><span className="text-sm text-[hsl(var(--secondary-foreground)/.65)]">Every day</span><span className="mono text-sm text-[hsl(var(--accent))]">11 am — 12 am</span></div>
                <button onClick={() => setExpandedHours((open) => !open)} className="focus-ring mt-6 flex w-full items-center justify-between border-t border-[hsl(var(--secondary-foreground)/.17)] pt-5 text-left text-sm font-semibold" aria-expanded={expandedHours} data-testid="button-hours-details">Good to know <ChevronDown className={`h-4 w-4 transition-transform ${expandedHours ? 'rotate-180' : ''}`} /></button>
                {expandedHours && <div className="mt-4 rounded-xl bg-[hsl(var(--secondary-foreground)/.08)] p-4 text-sm leading-relaxed text-[hsl(var(--secondary-foreground)/.68)] animate-rise">Open late for after-dinner dessert, family catch-ups, and the cravings that do not check the clock. Pickup and delivery available.</div>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[hsl(var(--secondary))] px-5 pb-8 pt-16 text-[hsl(var(--secondary-foreground))] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.8fr]">
            <div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><span className="serif text-xl font-bold">E</span></span><span className="serif text-3xl">Elysian Sweets</span></div><p className="mt-5 max-w-xs text-sm leading-relaxed text-[hsl(var(--secondary-foreground)/.57)]">A warm little destination for sweets, savouries and small celebrations in Jhang.</p></div>
            <div><p className="mono text-[.62rem] uppercase tracking-[.2em] text-[hsl(var(--accent))]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[hsl(var(--secondary-foreground)/.7)]"><a href="#story" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-story">Our story</a><a href="#menu" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-menu">Menu</a><a href="#visit" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-visit">Find us</a></div></div>
            <div><p className="mono text-[.62rem] uppercase tracking-[.2em] text-[hsl(var(--accent))]">Order / ask</p><div className="mt-5 grid gap-3 text-sm text-[hsl(var(--secondary-foreground)/.7)]"><button onClick={() => chooseOrder('pickup')} className="text-left hover:text-[hsl(var(--accent))]" data-testid="button-footer-pickup">Pickup order</button><button onClick={() => chooseOrder('delivery')} className="text-left hover:text-[hsl(var(--accent))]" data-testid="button-footer-delivery">Delivery order</button><a href="tel:+923401111564" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-phone">+92 340 1111564</a></div></div>
          </div>
          <div className="hairline bg-[hsl(var(--secondary-foreground)/.16)]" />
          <div className="flex flex-col justify-between gap-3 pt-6 text-[.68rem] text-[hsl(var(--secondary-foreground)/.45)] sm:flex-row"><span>© {new Date().getFullYear()} Elysian Sweets, Jhang</span><span>LDS Mall · Session Chowk · Open until 12 am</span></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;