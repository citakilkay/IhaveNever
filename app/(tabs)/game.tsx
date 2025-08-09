import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, RotateCcw, ArrowRight } from 'lucide-react-native';
import { QuestionCard, QuestionCardRef } from '@/components/QuestionCard';
import { useAtomValue, useSetAtom } from 'jotai';
import { gameStateAtom, getNextQuestionAtom, resetGameAtom } from '@/atoms/game';
import { useRef } from 'react';

export default function GameScreen() {
  const gameState = useAtomValue(gameStateAtom);
  const getNextQuestion = useSetAtom(getNextQuestionAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const questionCardRef = useRef<QuestionCardRef>(null);

  const handleNextQuestion = () => {
    if (!gameState.currentCategory) return;

    const remainingQuestions = gameState.currentCategory.questions.length - gameState.usedQuestions.size;

    if (remainingQuestions <= 0) {
      Alert.alert(
        'All Questions Used!',
        'You\'ve seen all questions in this category. Starting over!',
        [{ text: 'OK', onPress: () => router.push('/') }]
      );
    } else {
      // Get the new color first
      const newColor = gameState.currentCategory.color; // #TODO -- use the question color

      // Trigger animation with the new color
      questionCardRef.current?.triggerChangeAnimation(newColor);

      // Then update the question
      setTimeout(() => {
        getNextQuestion();
      }, 500);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to go back to categories?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetGame();
            router.push('/');
          }
        }
      ]
    );
  };

  if (!gameState.currentQuestion || !gameState.currentCategory) {
    return (
      <LinearGradient
        colors={['#0f0f23', '#1a1a2e', '#16213e']}
        style={styles.container}
      >
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Game Active</Text>
          <Text style={styles.emptySubtitle}>
            Go to Categories and select one to start playing!
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.startButtonText}>Choose Category</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const remainingQuestions = gameState.currentCategory.questions.length - gameState.usedQuestions.size;

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleReset}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Playing Now</Text>
          <Text style={styles.headerSubtitle}>
            {remainingQuestions} questions left
          </Text>
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={resetGame}>
          <RotateCcw size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <QuestionCard
          ref={questionCardRef}
          question={gameState.currentQuestion}
          questionNumber={gameState.questionIndex + 1}
          totalQuestions={gameState.currentCategory.questions.length}
          categoryColor={gameState.currentCategory.color}
        />

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: gameState.currentCategory.color }]}
          onPress={handleNextQuestion}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next Question</Text>
          <ArrowRight size={24} color="#fff" />
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#8892b0',
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nextButton: {
    margin: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#8892b0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#ff6b9d',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});