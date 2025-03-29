// import React from 'react';
// import { View } from 'react-native';
// import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// interface FarmingIconProps {
//   type: 'organic' | 'rainwater' | 'fish' | 'other';
//   size?: number;
//   color?: string;
//   selected?: boolean;
// }

// export default function FarmingIcon({
//   type,
//   size = 28,
//   color = '#10B981',
//   selected = false
// }: FarmingIconProps) {
//   const getIconComponent = () => {
//     switch (type) {
//       case 'organic':
//         return <FontAwesome5 name="leaf" size={size} color={color} />;
//       case 'rainwater':
//         return <MaterialCommunityIcons name="pine-tree" size={size} color={color} />;
//       case 'fish':
//         return <MaterialCommunityIcons name="fish" size={size} color={color} />;
//       case 'other':
//         return <MaterialCommunityIcons name="tune" size={size} color={color} />;
//       default:
//         return <FontAwesome5 name="leaf" size={size} color={color} />;
//     }
//   };

//   return (
//     <View className={`
//       w-16 h-16
//       rounded-full 
//       flex-row
//       justify-center 
//       items-center
//       bg-white
//     `}>
//       {getIconComponent()}
//     </View>
//   );
// }

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = 'leaf' | 'water' | 'satellite-variant' | 'sprout';

interface FarmingIconProps {
  type: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const getIconName = (type: string): IconName => {
  switch (type) {
    case 'leaf':
      return 'leaf';
    case 'water':
      return 'water';
    case 'satellite':
      return 'satellite-variant';
    case 'sprout':
      return 'sprout';
    default:
      return 'leaf';
  }
};

export default function FarmingIcon({ type, label, isSelected, onPress }: FarmingIconProps) {
  return (
    <Pressable
      style={styles.pressable}
      onPress={onPress}
    >
      <View style={[
        styles.container,
        isSelected ? styles.selectedContainer : null
      ]}>
        <MaterialCommunityIcons
          name={getIconName(type)}
          size={24}
          color={isSelected ? '#FFFFFF' : '#16a34a'}
        />
      </View>
      <Text
        style={[
          styles.label,
          isSelected ? styles.selectedLabel : null
        ]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 16,
  },
  container: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  selectedContainer: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  label: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
}); 
