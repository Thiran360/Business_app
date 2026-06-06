import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, globalStyles, getIndustryStyle } from '../../theme';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useAppContext } from '../../context/AppContext';
import { Member } from '../../data/mockData';
import Icon from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - spacing.lg * 2;

const SLIDES = [
  {
    id: '1',
    title: 'Business Summit 2026',
    subtitle: 'Register now for the biggest networking event of the year.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    icon: 'trending-up',
    tag: 'Event',
  },
  {
    id: '2',
    title: 'Grow Your Business',
    subtitle: 'Connect with 100+ verified business experts and mentors in one place.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80',
    icon: 'users',
    tag: 'Network',
  },
  {
    id: '3',
    title: 'Startup Funding Insights',
    subtitle: 'Learn how top startups secured Series A funding in 6 months.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80',
    icon: 'dollar-sign',
    tag: 'Startup',
  },
  {
    id: '4',
    title: 'Featured Opportunity',
    subtitle: 'Multiple franchise and partnership openings — explore now.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80',
    icon: 'briefcase',
    tag: 'Opportunity',
  },
  {
    id: '5',
    title: 'Member Success Story',
    subtitle: '"Joining BSN doubled my client base." — Priya S.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80',
    icon: 'award',
    tag: 'Success',
  },
];

const AutoSlider = () => {
  const flatRef = useRef<FlatList>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setActiveIdx(prev => {
        const next = (prev + 1) % SLIDES.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const onScrollEnd = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SLIDER_WIDTH);
    setActiveIdx(idx);
  };

  return (
    <View style={sliderStyles.wrapper}>
      <FlatList
        ref={flatRef}
        data={SLIDES}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, i) => ({ length: SLIDER_WIDTH, offset: SLIDER_WIDTH * i, index: i })}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.image }}
            style={[sliderStyles.slide, { width: SLIDER_WIDTH }]}
            imageStyle={sliderStyles.slideImage}
          >
            {/* Dark overlay */}
            <View style={sliderStyles.overlay} />
            <View style={sliderStyles.tagRow}>
              <View style={sliderStyles.tagBadge}>
                <Text style={sliderStyles.tagText}>{item.tag}</Text>
              </View>
            </View>
            <Icon name={item.icon} size={36} color={colors.accent} style={{ marginBottom: spacing.sm }} />
            <Text style={sliderStyles.slideTitle}>{item.title}</Text>
            <Text style={sliderStyles.slideSubtitle}>{item.subtitle}</Text>
          </ImageBackground>
        )}
      />
      {/* Dot indicators */}
      <View style={sliderStyles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[sliderStyles.dot, i === activeIdx && sliderStyles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const sliderStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  slide: {
    borderRadius: 20,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 220,
    overflow: 'hidden',
  },
  slideImage: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15,23,42,0.65)',
    borderRadius: 20,
  },
  tagRow: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
  },
  tagBadge: {
    backgroundColor: '#D4AF37', // Gold
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    color: '#0F172A',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  slideTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  slideSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.sizes.sm,
    lineHeight: 18,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#0F172A',
    width: 24,
  },
});

// ─── Main Home Screen ─────────────────────────────────────────────────────────

export const HomeScreen = () => {
  const { members, events, categories, announcements } = useAppContext();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();



  const stats = [
    { label: 'Members', value: `${members.length}+`, icon: 'users' },
    { label: 'Industries', value: `${categories.length}`, icon: 'layers' },
    { label: 'Events', value: `${events.length}`, icon: 'calendar' },
    { label: 'Cities', value: '10+', icon: 'map-pin' },
  ];

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* ── Navbar ── */}
      <View style={[styles.navbar, { paddingTop: insets.top + 12 }]}>
        <View style={styles.navbarLeft}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>S</Text>
          </View>
          <View>
            <Text style={styles.orgName}>BSN</Text>
            <Text style={styles.orgTagline}>Business Excellence Network</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Messages')}>
          <Icon name="mail" size={20} color="#CBD5E1" />
          {announcements && announcements.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{announcements.length > 9 ? '9+' : announcements.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + spacing.xxl }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroGlow1} />
          <View style={styles.heroGlow2} />
          
          <Text style={styles.heroTitle}>Connect, Grow &{'\n'}Lead Together</Text>
          <Text style={styles.heroSubtitle}>
            An exclusive community of elite business leaders, founders, and industry experts.
          </Text>
          <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate('Businesses')}>
            <Text style={styles.heroButtonText}>Explore Directory</Text>
            <Icon name="arrow-right" size={16} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Floating Stats */}
        <View style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.statItem}>
              <Icon name={stat.icon} size={20} color={colors.accent} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>


        {/* ── Auto Slider ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Business Highlights</Text>
          <View style={styles.liveDot}>
            <View style={styles.liveDotInner} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>
        <AutoSlider />

        {/* Business Categories Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Business Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Businesses')}>
            <Text style={styles.seeAll}>Browse All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          {categories.map((cat, index) => {
            const styleInfo = getIndustryStyle(cat);
            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Businesses', { category: cat })}
                activeOpacity={0.75}
              >
                <View style={[styles.categoryIconWrap, { backgroundColor: styleInfo.bg, borderColor: styleInfo.bg }]}>
                  <Icon name={styleInfo.icon} size={24} color={styleInfo.color} />
                </View>
                <Text style={styles.categoryText} numberOfLines={2}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>


        {/* Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EventsTab')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {events.slice(0, 2).map(event => (
          <Card key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Badge label={event.type} variant="accent" />
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventMeta}>
                <Icon name="calendar" size={13} color={colors.textSecondary} />
                <Text style={styles.eventMetaText}>{event.date}</Text>
              </View>
              <View style={styles.eventMeta}>
                <Icon name="map-pin" size={13} color={colors.textSecondary} />
                <Text style={styles.eventMetaText}>{event.location}</Text>
              </View>
            </View>
          </Card>
        ))}

        {/* Membership CTA */}
        <View style={styles.ctaCard}>
          <View style={styles.ctaOverlay} />
          <Icon name="shield" size={32} color="#D4AF37" style={{ marginBottom: spacing.md }} />
          <Text style={styles.ctaTitle}>Elevate Your Business</Text>
          <Text style={styles.ctaSubtitle}>
            Join BSN's premium network and scale with the top 1% of industry leaders.
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Apply for Membership</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl, backgroundColor: '#F8FAFC' },

  navbar: {
    backgroundColor: '#0F172A',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  navbarLeft: { flexDirection: 'row', alignItems: 'center' },
  logoCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#D4AF37', // Gold accent
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  logoLetter: { color: '#0F172A', fontSize: 20, fontWeight: '900' },
  orgName: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: 0.5 },
  orgTagline: { color: '#94A3B8', fontSize: 12, fontWeight: '500', letterSpacing: 0.2 },
  notifBtn: { 
    padding: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: '#0F172A',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },

  heroBanner: {
    backgroundColor: '#0F172A',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 70,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlow1: {
    position: 'absolute', width: 250, height: 250, borderRadius: 125,
    backgroundColor: '#1E293B', top: -50, right: -50, opacity: 0.5,
  },
  heroGlow2: {
    position: 'absolute', width: 150, height: 150, borderRadius: 75,
    backgroundColor: '#D4AF37', bottom: -20, left: -40, opacity: 0.15,
  },
  heroTitle: { color: '#F8FAFC', fontSize: 32, fontWeight: '800', lineHeight: 40, marginBottom: spacing.md, letterSpacing: -0.5 },
  heroSubtitle: { color: '#94A3B8', fontSize: 15, lineHeight: 22, marginBottom: spacing.xl, paddingRight: spacing.lg },
  heroButton: {
    backgroundColor: '#D4AF37', // Gold accent
    paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  heroButtonText: { color: '#0F172A', fontWeight: '800', fontSize: 15, marginRight: spacing.sm },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: spacing.lg,
    marginTop: -40,
    borderRadius: 16,
    paddingVertical: spacing.lg,
    shadowColor: '#0F172A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 16,
    elevation: 8,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 2, fontWeight: '600', textTransform: 'uppercase' },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.lg, paddingHorizontal: spacing.lg, marginTop: spacing.md,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A', letterSpacing: -0.3 },
  seeAll: { color: '#3B82F6', fontWeight: '700', fontSize: 14 },
  liveDot: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF2F2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  liveDotInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444', marginRight: 6 },
  liveText: { fontSize: 12, color: '#EF4444', fontWeight: '700', textTransform: 'uppercase' },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: 4,
  },
  categoryIconWrap: {
    width: 60, height: 60, borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1, borderColor: '#E2E8F0',
    shadowColor: '#0F172A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4,
  },
  categoryText: {
    fontSize: 11,
    color: '#334155',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 14,
    height: 28,
  },

  eventCard: {
    flexDirection: 'row', padding: 0, overflow: 'hidden',
    marginHorizontal: spacing.lg, marginBottom: spacing.md,
    borderRadius: 16,
    borderWidth: 1, borderColor: '#E2E8F0',
    shadowColor: '#0F172A', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  eventImage: { width: 110, height: '100%' },
  eventInfo: { flex: 1, padding: spacing.lg },
  eventTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginVertical: spacing.xs, lineHeight: 22 },
  eventMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  eventMetaText: { fontSize: 13, color: '#64748B', marginLeft: 6, fontWeight: '500' },

  ctaCard: {
    backgroundColor: '#0F172A', marginHorizontal: spacing.lg,
    borderRadius: 20, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xxl, marginTop: spacing.lg,
    position: 'relative', overflow: 'hidden',
  },
  ctaOverlay: {
    position: 'absolute', top: -100, right: -100, width: 200, height: 200, borderRadius: 100,
    backgroundColor: '#D4AF37', opacity: 0.1,
  },
  ctaTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: spacing.sm },
  ctaSubtitle: { color: '#94A3B8', fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: spacing.xl, paddingHorizontal: spacing.md },
  ctaButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 30, width: '100%', alignItems: 'center' },
  ctaButtonText: { color: '#0F172A', fontWeight: '800', fontSize: 15 },
});
