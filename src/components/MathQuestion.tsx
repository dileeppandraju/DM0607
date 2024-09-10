import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Modal } from 'react-native';
import Tts from 'react-native-tts';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Question } from '../models/schemas';
import { ActivityType } from '../enums/ActivityType';
import { defaultTheme } from '../themes/defaultTheme';
import { useQuestionStore } from '../state/questionStore';

interface MathQuestionProps {
  question: Question;
  onCorrectAnswer: () => void;
}

const MathQuestion: React.FC<MathQuestionProps> = ({ question, onCorrectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [showPartyBlast, setShowPartyBlast] = useState<boolean>(false);
  const [completedQuestions, setCompletedQuestions] = useState<Array<{ question: Question, isCorrect: boolean }>>([]);
  const [reviewIndex, setReviewIndex] = useState<number>(0);

  const selectedActivityType = useQuestionStore(state => state.selectedActivityType);
  const setActivityType = useQuestionStore(state => state.setActivityType);

  const wobbleAnimation = useRef(new Animated.Value(0)).current;
  const handAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Stop any ongoing TTS when a new question is loaded
    Tts.stop();

    if (selectedActivityType !== ActivityType.REVIEW) {
      // Start TTS for the new question
      Tts.getInitStatus().then(() => {
        Tts.speak(question.questionStatement);
      }).catch((err) => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });
    }

    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (selectedActivityType === ActivityType.TUTORIAL) {
      startTutorialAnimations();
    }
  }, [question, fadeAnimation, selectedActivityType]);

  useEffect(() => {
    setCorrectStreak(0);
  }, [selectedActivityType]);

  useEffect(() => {
    if (isCorrect === true) {
      setCorrectStreak(prev => prev + 1);
    } else if (isCorrect === false) {
      setCorrectStreak(0);
    }

    if (correctStreak === 2 && isCorrect === true) {
      triggerNotification();
      setShowPartyBlast(true);
      setTimeout(() => {
        setShowPartyBlast(false);
        setCorrectStreak(0);
      }, 3000); // Hide the party blast animation after 3 seconds
    }
  }, [isCorrect]);

  useEffect(() => {
    const scheduleFiveMinuteAlarms = () => {
      alarmIntervalRef.current = setInterval(async () => {
        await notifee.requestPermission();

        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
          sound: 'alarm_sound', // Ensure you have this sound file in the res/raw directory for Android
        });

        await notifee.displayNotification({
          title: 'Reminder',
          body: 'This is your 15-minute reminder alarm!',
          android: {
            channelId,
            smallIcon: 'ic_launcher', // Ensure you have this icon in your project
            sound: 'alarm_sound', // Ensure you have this sound file in the res/raw directory for Android
          },
        });
      }, 15 * 60 * 1000); // 15 minutes in milliseconds
    };

    scheduleFiveMinuteAlarms();

    // Cleanup the interval on component unmount
    return () => {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
      }
    };
  }, []);

  const triggerNotification = async () => {
    await notifee.requestPermission();

    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'alarm_sound', // Ensure you have this sound file in the res/raw directory for Android
    });

    await notifee.displayNotification({
      title: 'Great Job!',
      body: `You got 3 consecutive correct answers in: ${capitalizeFirstLetter(selectedActivityType)}`,
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher', // Make sure to use the correct icon
        sound: 'alarm_sound', // Ensure you have this sound file in the res/raw directory for Android
      },
    });
  };

  const startTutorialAnimations = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wobbleAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnimation, {
          toValue: -1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(handAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(handAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handlePress = (number: number) => {
    Tts.speak(number.toString());

    setSelectedAnswer(number);
    const correct = number === question.answer;
    setIsCorrect(correct);
    setShowAnimation(true);

    const sound = new Sound(correct ? require('../assets/correct.mp3') : require('../assets/wrong.mp3'), Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      sound.play(() => {
        sound.release();
      });
    });

    if (selectedActivityType === ActivityType.TEST) {
      setTimeout(() => {
        setShowAnimation(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        onCorrectAnswer();
        resetFadeAnimation();
      }, 2000);
    } else if (selectedActivityType === ActivityType.PRACTICE) {
      if (correct) {
        setTimeout(() => {
          setShowAnimation(false);
          setSelectedAnswer(null);
          setIsCorrect(null);
          onCorrectAnswer();
          resetFadeAnimation();
        }, 2000);
      } else {
        setTimeout(() => {
          setShowAnimation(false);
        }, 2000);
      }
    } else if (selectedActivityType === ActivityType.TUTORIAL) {
      setTimeout(() => {
        setShowAnimation(false);
        if (correct) {
          setSelectedAnswer(null);
          setIsCorrect(null);
          onCorrectAnswer();
          resetFadeAnimation();
        }
      }, 2000);
    } else if (selectedActivityType === ActivityType.TUTORIAL_AFTER_WRONG) {
      setTimeout(() => {
        setShowAnimation(false);
        if (!correct) {
          startTutorialAnimations();
        }
        if (correct) {
          setSelectedAnswer(null);
          setIsCorrect(null);
          onCorrectAnswer();
          resetFadeAnimation();
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setShowAnimation(false);
        if (correct) {
          setCorrectStreak(correctStreak + 1);
          if (correctStreak + 1 === 3) {
            setShowPartyBlast(true);
            setCorrectStreak(0);
          } else {
            setSelectedAnswer(null);
            setIsCorrect(null);
            onCorrectAnswer();
            resetFadeAnimation();
          }
        } else {
          setCorrectStreak(0);
        }
      }, 2000);
    }

    if (selectedActivityType !== ActivityType.REVIEW) {
      setCompletedQuestions([...completedQuestions, { question, isCorrect: correct }]);
    }
  };

  const getButtonStyle = (number: number) => {
    if (selectedAnswer === number) {
      return isCorrect ? defaultTheme.correctButton : defaultTheme.incorrectButton;
    }
    return defaultTheme.numberButton;
  };

  const getReviewButtonStyle = (number: number, isCorrect: boolean) => {
    if (number === completedQuestions[reviewIndex]?.question.answer) {
      return isCorrect ? defaultTheme.correctButton : defaultTheme.incorrectButton;
    }
    return defaultTheme.numberButton;
  };

  const animatedStyle = {
    transform: [{
      rotate: wobbleAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-5deg', '5deg'],
      }),
    }],
  };

  const handAnimatedStyle = {
    transform: [{
      translateY: handAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10], // Adjust the range to control the up-down motion
      }),
    }],
  };

  const handleActivityTypePress = (activityType: ActivityType) => {
    setActivityType(activityType);
    Tts.speak(activityType);
    setModalVisible(false);
    resetQuestion();
    if (activityType === ActivityType.REVIEW) {
      Tts.stop();
      setReviewIndex(0);
    } else {
      Tts.getInitStatus().then(() => {
        Tts.speak(question.questionStatement);
      }).catch((err) => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });
    }
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowAnimation(false);
    wobbleAnimation.stopAnimation();
    wobbleAnimation.setValue(0);
    handAnimation.stopAnimation();
    handAnimation.setValue(0);
  };

  const resetFadeAnimation = () => {
    fadeAnimation.setValue(0);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleNextReview = () => {
    if (reviewIndex < completedQuestions.length - 1) {
      setReviewIndex(reviewIndex + 1);
    }
  };

  const handlePreviousReview = () => {
    if (reviewIndex > 0) {
      setReviewIndex(reviewIndex - 1);
    }
  };

  return (
    <Animated.View style={[defaultTheme.container, { opacity: fadeAnimation }]}>
      <TouchableOpacity 
        style={defaultTheme.topLeftButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={defaultTheme.buttonText}>Activity Type</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          resetQuestion();
        }}
      >
        <View style={defaultTheme.modalContainer}>
          <View style={defaultTheme.modalView}>
            <Text style={defaultTheme.modalText}>Choose Activity Type</Text>
            {Object.values(ActivityType).map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  defaultTheme.popupButton, 
                  selectedActivityType === item && defaultTheme.selectedButton,
                  item === ActivityType.REVIEW && completedQuestions.length === 0 && defaultTheme.disabledButton
                ]}
                onPress={() => handleActivityTypePress(item)}
                disabled={item === ActivityType.REVIEW && completedQuestions.length === 0}
              >
                <Text style={defaultTheme.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={defaultTheme.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                resetQuestion();
              }}
            >
              <Text style={defaultTheme.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={defaultTheme.questionContainer}>
        <Text style={defaultTheme.questionText}>
          {selectedActivityType === ActivityType.REVIEW && completedQuestions[reviewIndex] ? 
            completedQuestions[reviewIndex].question.questionStatement : 
            question.questionStatement}
        </Text>
      </View>
      {selectedActivityType === ActivityType.REVIEW && completedQuestions[reviewIndex] ? (
        <>
          <View style={defaultTheme.numbersContainer}>
            {completedQuestions[reviewIndex].question.choicesContent.map((number, index) => (
              <TouchableOpacity
                key={index}
                style={getReviewButtonStyle(number, completedQuestions[reviewIndex].isCorrect)}
                disabled={true} // Disable button during review
              >
                <Text style={defaultTheme.numberText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={defaultTheme.reviewButtonsContainer}>
            <TouchableOpacity 
              style={[defaultTheme.reviewButton, reviewIndex === 0 && defaultTheme.disabledButton]} 
              onPress={handlePreviousReview} 
              disabled={reviewIndex === 0}
            >
              <Text style={defaultTheme.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[defaultTheme.reviewButton, reviewIndex === completedQuestions.length - 1 && defaultTheme.disabledButton]} 
              onPress={handleNextReview} 
              disabled={reviewIndex === completedQuestions.length - 1}
            >
              <Text style={defaultTheme.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={defaultTheme.numbersContainer}>
          {question.choicesContent.map((number, index) => (
            <Animated.View 
              key={index} 
              style={selectedActivityType === ActivityType.TUTORIAL && number === question.answer ? animatedStyle : undefined}>
              <TouchableOpacity
                style={getButtonStyle(number)}
                onPress={() => handlePress(number)}
              >
                <Text style={defaultTheme.numberText}>{number}</Text>
                {selectedActivityType === ActivityType.TUTORIAL && number === question.answer && (
                  <Animated.Image
                    source={require('../assets/pointer_bottom.png')}
                    style={[defaultTheme.handPointer, handAnimatedStyle]}
                  />
                )}
                {selectedActivityType === ActivityType.TUTORIAL_AFTER_WRONG && selectedAnswer !== null && !isCorrect && number === question.answer && (
                  <Animated.Image
                    source={require('../assets/pointer_bottom.png')}
                    style={[defaultTheme.handPointer, handAnimatedStyle]}
                  />
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      )}
      {showAnimation && (
        <LottieView
          source={isCorrect ? require('../assets/correct.json') : require('../assets/wrong.json')}
          autoPlay
          loop={false}
          style={defaultTheme.feedbackAnimation}
        />
      )}
      {showPartyBlast && (
        <LottieView
          source={require('../assets/party_blast.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setShowPartyBlast(false);
            resetQuestion();
            onCorrectAnswer();
            resetFadeAnimation();
          }}
          style={defaultTheme.partyBlastAnimation}
        />
      )}
      <View style={defaultTheme.activityTypeContainer}>
        <Text style={defaultTheme.activityTypeText}>Activity: {capitalizeFirstLetter(selectedActivityType)}</Text>
      </View>
    </Animated.View>
  );
};

export default MathQuestion;
