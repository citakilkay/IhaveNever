import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { CategoryCard } from '@/components/CategoryCard';
import { gameCategories } from '@/data/categories';
import { GameCategory } from '@/types/game';
import { useSetAtom } from 'jotai';
import { startGameAtom } from '@/atoms/game';

export default function CategoriesScreen() {
  const startGame = useSetAtom(startGameAtom);

  const handleCategoryPress = (category: GameCategory) => {
    startGame(category);
    router.push('/game');
  };

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
        {gameCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={handleCategoryPress}
          />
        ))}
      </ScrollView>
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