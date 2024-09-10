import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import MathQuestionManagerContainer from '../containers/MathQuestionManagerContainer';
import {defaultTheme} from '../themes/defaultTheme';
import {useQuestionStore} from '../state/questionStore';
import QuestionListModal from '../components/QuestionListModal';
import {clearQuestionsFromRealm} from '../services/QuestionService';
import Realm from 'realm';

const MathQuestionScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const generateQuestions = useQuestionStore(state => state.generateQuestions);
  //const realm = new Realm(); // Ensure you have Realm instance

  useEffect(() => {
    clearQuestionsFromRealm();
    console.log('generateQuestions');
    generateQuestions(100); // Example to generate questions
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={defaultTheme.container}>
      <Button title="Show Questions" onPress={handleOpenModal} />
      <QuestionListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <MathQuestionManagerContainer />
    </View>
  );
};

export default MathQuestionScreen;
