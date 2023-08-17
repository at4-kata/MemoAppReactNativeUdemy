import { View, StyleSheet, Text } from 'react-native';
import { string } from '../../node_modules/prop-types';

export default function Button(props) {
  const { label } = props;
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  );
}

Button.propTypes = {
  label: string.isRequired,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#467fd3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 32,
  },
});
