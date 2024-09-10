import React from 'react';
import {Modal, View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {useQuestionStore} from '../state/questionStore';

interface QuestionListModalProps {
  visible: boolean;
  onClose: () => void;
}

const QuestionListModal: React.FC<QuestionListModalProps> = ({
  visible,
  onClose,
}) => {
  const questions = useQuestionStore(state => state.questions);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Questions</Text>
          <FlatList
            data={questions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.questionItem}>
                <Text>
                  {item.serialNumber}. {item.questionStatement}
                </Text>
              </View>
            )}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#222',

    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  questionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default QuestionListModal;
