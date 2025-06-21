import { View, Text, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { CategoryCard } from '@/components/CategoryCard';
import { gameCategories } from '@/data/categories';
import { GameCategory } from '@/types/game';
import { useSetAtom } from 'jotai';
import { startGameAtom } from '@/atoms/game';
import { useState } from 'react';
import AgeConfirmationModal from '@/components/AgeConfirmationModal';

export default function CategoriesScreen() {
  const startGame = useSetAtom(startGameAtom);
  const [matureCategory, setMatureCategory] = useState<GameCategory | null>(null)

  const handleGameStart = (category: GameCategory) => {
    setMatureCategory(null)
    startGame(category);
    router.push('/game');
  };

  const handleCategoryPress = (category: GameCategory) => {
    if (category.matureContent) setMatureCategory(category)
    else handleGameStart(category)
  }

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>I Have Never</Text>
        <Text style={styles.subtitle}>Choose a category to start playing!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {[...gameCategories].sort(() => Math.random() - 0.5).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={() => handleCategoryPress(category)}
          />
        ))}
      </ScrollView>
      <AgeConfirmationModal
        visible={!!matureCategory}
        onConfirm={() => handleGameStart(matureCategory!!)}
        onCancel={() => setMatureCategory(null)}
      // yesColor={matureCategory?.color}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#8892b0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});