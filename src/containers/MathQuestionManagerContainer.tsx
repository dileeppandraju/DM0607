import React, {useEffect} from 'react';
import {View} from 'react-native';
// import Realm from 'realm';
import {useQuestion} from '../hooks/useQuestion';
import MathQuestion from '../components/MathQuestion';
import {DEFAULT_QUESTION_COUNT} from '../constants';
import {defaultTheme} from '../themes/defaultTheme';
// import {QuestionSchema} from '../models/schemas';
// import {clearQuestionsFromRealm} from '../services/QuestionService';
import { closeRealmInstance } from '../realmConfig';

const MathQuestionManagerContainer: React.FC = () => {
  const {generateQuestions, getCurrentQuestion, moveToNextQuestion} = useQuestion();
  const currentQuestion = getCurrentQuestion();

  // useEffect(() => {
  //   clearQuestionsFromRealm(realm);
  // }, []);

  // useEffect(() => {
  //   generateQuestions(DEFAULT_QUESTION_COUNT); // Generate questions when the component mounts
  // }, [generateQuestions]);
  useEffect(() => {
    return () => {
      closeRealmInstance(); // Close the Realm instance when the component unmounts
    };
  }, [generateQuestions]);

  const handleCorrectAnswer = () => {
    moveToNextQuestion();
  };

  return (
    <View style={defaultTheme.container}>
      {currentQuestion && (
        <MathQuestion
          question={currentQuestion}
          onCorrectAnswer={handleCorrectAnswer}
        />
      )}
    </View>
  );
};

export default MathQuestionManagerContainer;
