import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {ActivityType} from '../enums/ActivityType';
import {defaultTheme} from '../themes/defaultTheme';

interface ActivityTypeModalProps {
  visible: boolean;
  selectedActivityType: ActivityType;
  completedQuestionsLength: number;
  onClose: () => void;
  onSelect: (activityType: ActivityType) => void;
}

const ActivityTypeModal: React.FC<ActivityTypeModalProps> = ({
  visible,
  selectedActivityType,
  completedQuestionsLength,
  onClose,
  onSelect,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={defaultTheme.modalContainer}>
        <View style={defaultTheme.modalView}>
          <Text style={defaultTheme.modalText}>Choose Activity Type</Text>
          {Object.values(ActivityType).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                defaultTheme.popupButton,
                selectedActivityType === item && defaultTheme.selectedButton,
                item === ActivityType.REVIEW &&
                  completedQuestionsLength === 0 &&
                  defaultTheme.disabledButton,
              ]}
              onPress={() => onSelect(item)}
              disabled={
                item === ActivityType.REVIEW && completedQuestionsLength === 0
              }>
              <Text style={defaultTheme.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={defaultTheme.closeButton} onPress={onClose}>
            <Text style={defaultTheme.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ActivityTypeModal;
