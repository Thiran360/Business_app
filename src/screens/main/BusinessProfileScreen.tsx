import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

export const BusinessProfileScreen = () => {
  const route = useRoute<any>();
  const { memberId } = route.params;
  const { members } = useAppContext();

  const member = members.find(m => m.id === memberId);

  if (!member) {
    return (
      <View style={globalStyles.container}>
        <Header title="Profile Not Found" showBack />
      </View>
    );
  }

  const handleEmail = () => {
    if (member.socialMedia.email) {
      Linking.openURL(`mailto:${member.socialMedia.email}`);
    } else {
      Linking.openURL(`mailto:${member.company.contactInfo.split('|')[0].trim()}`); // fallback
    }
  };

  const handleCall = () => {
    if (member.socialMedia.phone) {
      Linking.openURL(`tel:${member.socialMedia.phone}`);
    } else {
      // Fallback
      const parts = member.company.contactInfo.split('|');
      if (parts.length > 1) Linking.openURL(`tel:${parts[1].trim()}`);
    }
  };

  const handleWhatsApp = () => {
    if (member.socialMedia.whatsapp) {
      Linking.openURL(`whatsapp://send?phone=${member.socialMedia.whatsapp}`);
    }
  };

  const openLink = (url: string) => {
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }
    Linking.openURL(finalUrl);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : '?';
  };

  const getReferrals = () => {
    if (!member) return [];
    const needs = member.company.needs || [];
    let matches = members.filter(m => m.id !== member.id && m.type === 'Business');
    
    if (needs.length > 0) {
      matches = matches.filter(m => {
        return m.company.services.some(srv => needs.includes(srv)) || m.company.products.some(prod => needs.includes(prod));
      });
    }
    
    return matches.slice(0, 3);
  };
  const referrals = getReferrals();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon 
          key={i} 
          name="star" 
          size={16} 
          color={i <= rating ? colors.accent : colors.border} 
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Business Profile" showBack rightIcon="more-vertical" />
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Personal Details */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
          </View>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.designation}>{member.designation}</Text>
          <View style={styles.badges}>
            <Badge label={member.type} variant={member.type === 'Startup' ? 'accent' : 'default'} />
            <Badge label={member.industry} />
          </View>
          
          <View style={styles.reviewContainer}>
            {renderStars(member.reviews.rating)}
            <Text style={styles.reviewText}>{member.reviews.rating} ({member.reviews.count} Reviews)</Text>
          </View>

          <View style={styles.socialRow}>
            {member.socialMedia.linkedin && (
              <TouchableOpacity onPress={() => openLink(member.socialMedia.linkedin!)}>
                <Icon name="linkedin" size={24} color="#0077b5" style={styles.socialIcon} />
              </TouchableOpacity>
            )}
            {member.socialMedia.twitter && (
              <TouchableOpacity onPress={() => openLink(member.socialMedia.twitter!)}>
                <Icon name="twitter" size={24} color="#1DA1F2" style={styles.socialIcon} />
              </TouchableOpacity>
            )}
            {member.socialMedia.instagram && (
              <TouchableOpacity onPress={() => openLink(member.socialMedia.instagram!)}>
                <Icon name="instagram" size={24} color="#E1306C" style={styles.socialIcon} />
              </TouchableOpacity>
            )}
            {member.socialMedia.facebook && (
              <TouchableOpacity onPress={() => openLink(member.socialMedia.facebook!)}>
                <Icon name="facebook" size={24} color="#4267B2" style={styles.socialIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={[styles.sectionSubtitle, { alignSelf: 'flex-start' }]}>Connect Options</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Icon name="phone" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleWhatsApp}>
            <Icon name="message-circle" size={24} color="#25D366" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
            <Icon name="mail" size={24} color={colors.accent} />
            <Text style={styles.actionText}>Gmail</Text>
          </TouchableOpacity>
        </View>

        {/* Business Details */}
        <Card style={styles.card}>
          <View style={styles.companyHeader}>
            <Image source={typeof member.company.logo === 'string' ? { uri: member.company.logo } : member.company.logo} style={styles.companyLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.companyName}>{member.company.name}</Text>
              <Text style={styles.companyCategory}>{member.company.category}</Text>
            </View>
          </View>

          <Text style={styles.companyDescription}>{member.company.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionSubtitle}>Product Catalog & Services</Text>
          <View style={styles.tagContainer}>
            {member.company.services.map((srv, idx) => (
              <View key={`srv-${idx}`} style={styles.tag}>
                <Text style={styles.tagText}>{srv}</Text>
              </View>
            ))}
            {member.company.products.map((prod, idx) => (
              <View key={`prod-${idx}`} style={[styles.tag, { borderColor: colors.accent, backgroundColor: colors.accent + '10' }]}>
                <Text style={[styles.tagText, { color: colors.accent }]}>{prod}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Icon name="map-pin" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{member.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>Founded: {member.company.foundedYear}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="globe" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.primary }]} onPress={() => openLink(`https://${member.company.website}`)}>
              {member.company.website}
            </Text>
          </View>
        </Card>

        {/* Startup Showcase if applicable */}
        {member.startupInfo && (
          <Card style={[styles.card, styles.startupCard]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <Icon name="rocket" size={20} color={colors.accent} style={{ marginRight: spacing.sm }} />
              <Text style={styles.sectionTitle}>Startup Showcase</Text>
            </View>
            <Text style={styles.companyDescription}>{member.startupInfo.description}</Text>
            
            <View style={styles.infoRow}>
              <Icon name="trending-up" size={16} color={colors.textSecondary} />
              <Text style={styles.infoText}>Funding Stage: {member.startupInfo.fundingStage}</Text>
            </View>

            <View style={styles.tagContainer}>
              {member.startupInfo.categories.map((cat, idx) => (
                <View key={`cat-${idx}`} style={styles.tag}>
                  <Text style={styles.tagText}>{cat}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Business Referrals */}
        {referrals.length > 0 && (
          <View style={{ marginTop: spacing.md, marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <Icon name="users" size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />
              <Text style={styles.sectionTitle}>Recommended for {member.company.name}</Text>
            </View>
            {referrals.map((ref, idx) => (
              <TouchableOpacity key={idx} style={styles.referralCard} onPress={() => {}}>
                <Image source={typeof ref.company.logo === 'string' ? { uri: ref.company.logo } : ref.company.logo} style={styles.referralLogo} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', color: colors.text }}>{ref.company.name}</Text>
                  <Text style={{ fontSize: typography.sizes.xs, color: colors.textSecondary }}>{ref.industry}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={colors.border} />
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.sm,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.surface,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: typography.sizes.xxxl,
    fontWeight: 'bold',
  },
  name: {
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  designation: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  badges: {
    flexDirection: 'row',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  reviewText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  socialIcon: {
    marginHorizontal: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.xs,
    width: '100%',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  referralLogo: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: spacing.md,
    backgroundColor: '#eee',
  },
  card: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: spacing.md,
    backgroundColor: '#eee',
  },
  companyName: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  companyCategory: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  companyDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginVertical: spacing.sm,
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  startupCard: {
    borderColor: colors.accent,
    borderWidth: 1,
    backgroundColor: '#FFFAF0',
  },
});
