import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { GameQuestion } from '@/types/game';

interface QuestionCardProps {
  question: GameQuestion;
  questionNumber: number;
  totalQuestions: number;
  categoryColor: string;
}

const { width } = Dimensions.get('window');

export function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions,
  categoryColor 
}: QuestionCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      exiting={FadeOutDown.duration(400)}
      style={styles.container}
    >
      <LinearGradient
        colors={[categoryColor, `${categoryColor}DD`]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.category}>{question.category}</Text>
          <Text style={styles.counter}>
            {questionNumber} / {totalQuestions}
          </Text>
        </View>
        
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.instructions}>
            Drink if you HAVE done this! 🍻
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    padding: 24,
    minHeight: width * 0.8,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  category: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
  counter: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  instructions: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
    textAlign: 'center',
  },
});