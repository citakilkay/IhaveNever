import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameCategory } from '@/types/game';
import { useLocalization } from '@/hooks/useLocalization';

interface CategoryCardProps {
  category: GameCategory;
  onPress: (category: GameCategory) => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  const { currentLocale } = useLocalization();
  console.log(category.questions[currentLocale])
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[category.color, `${category.color}CC`]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={styles.name}>{category.name[currentLocale]}</Text>
          <Text style={styles.description}>{category.description[currentLocale]}</Text>
          <Text style={styles.questionCount}>
            {category.questions[currentLocale].length} questions
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradient: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 8,
  },
  questionCount: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    fontWeight: '500',
  },
});