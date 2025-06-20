import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInUp,
  FadeOutDown,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { GameQuestion } from '@/types/game';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { generateVariantColor } from '@/utils/colors';

const { width } = Dimensions.get('window');

interface QuestionCardProps {
  question: GameQuestion;
  questionNumber: number;
  totalQuestions: number;
  categoryColor: string;
}

export type QuestionCardRef = {
  triggerChangeAnimation: (newColor: string) => void;
};

export const QuestionCard = forwardRef<QuestionCardRef, QuestionCardProps>(
  ({ question, questionNumber, totalQuestions, categoryColor }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentColor, setCurrentColor] = useState(categoryColor);
    const [displayQuestion, setDisplayQuestion] = useState(question);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(currentColor, {
          duration: 500,
          easing: Easing.inOut(Easing.ease)
        }),
      };
    });

    useEffect(() => {
      const variantColor = generateVariantColor(categoryColor, questionNumber);
      setCurrentColor(variantColor);
      setDisplayQuestion(question);
    }, [question, categoryColor]);


    const triggerChangeAnimation = (newColor: string) => {
      setIsLoading(true);

      // After a short delay, update to new color
      setTimeout(() => {
        setCurrentColor(newColor);
        setIsLoading(false);
      }, 500);
    };

    useImperativeHandle(ref, () => ({
      triggerChangeAnimation
    }));

    return (
      <Animated.View
        entering={FadeInUp.duration(600)}
        exiting={FadeOutDown.duration(400)}
        style={[styles.container, animatedStyle]}
      >
        <LinearGradient
          colors={[currentColor, `${currentColor}DD`]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <>
              <View style={styles.header}>
                <Text style={styles.category}>{displayQuestion.category}</Text>
                <Text style={styles.counter}>
                  {questionNumber} / {totalQuestions}
                </Text>
              </View>

              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{displayQuestion.text}</Text>
              </View>

              <View style={styles.footer}>
                <Text style={styles.instructions}>
                  Drink if you HAVE done this! 🍻
                </Text>
              </View>
            </>
          )}
        </LinearGradient>
      </Animated.View>
    );
  }
);

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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});