import {StyleSheet} from 'react-native';

export const defaultTheme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  topLeftButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Boogaloo-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'regular',
    color: '#333',
    fontFamily: 'Boogaloo-Regular',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  popupButton: {
    padding: 10,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#d38545', // Highlight selected button with a different color
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // Gray color for disabled buttons
  },
  questionContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'regular',
    color: '#333',
    fontFamily: 'Boogaloo-Regular',
  },
  numbersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  numberButton: {
    padding: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    position: 'relative', // Added for proper positioning of the hand pointer
  },
  correctButton: {
    padding: 20,
    backgroundColor: '#32CD32',
    borderRadius: 10,
    position: 'relative', // Added for proper positioning of the hand pointer
  },
  incorrectButton: {
    padding: 20,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    position: 'relative', // Added for proper positioning of the hand pointer
  },
  numberText: {
    fontSize: 24,
    color: '#fff',
  },
  handPointer: {
    width: '80%',
    height: '160%',
    position: 'absolute',
    top: '-180%', // Adjust this value to position the hand pointer correctly above the button
    marginLeft: 15, // Adjust to half the width of the image to center it
  },
  feedbackAnimation: {
    width: '20%',
    height: '20%',
    position: 'absolute',
  },
  partyBlastAnimation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  activityTypeContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#87CEEB',
    padding: 10,
    borderRadius: 5,
  },
  activityTypeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Boogaloo-Regular',
  },
  reviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  reviewButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
