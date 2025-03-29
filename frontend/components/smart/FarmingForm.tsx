// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, Pressable } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import FarmingIcon from './FarmingIcon';

// interface FarmingFormProps {
//   onSubmit: (data: {
//     technique: string;
//     farmSize: number;
//     budgetRange: string;
//   }) => void;
//   isLoading: boolean;
// }

// export default function FarmingForm({ onSubmit, isLoading }: FarmingFormProps) {
//   const [technique, setTechnique] = useState<string>('organic_farming');
//   const [farmSize, setFarmSize] = useState<string>('1');
//   const [budgetRange, setBudgetRange] = useState<string>('Medium Scale (₹5L - ₹20L)');
//   const [showDropdown, setShowDropdown] = useState<boolean>(false);

//   const handleSubmit = () => {
//     // Parse farm size to a number
//     const parsedFarmSize = parseFloat(farmSize) || 1;

//     // Extract budget range from the selection
//     let simplifiedBudgetRange = 'medium';
//     if (budgetRange.includes('Small')) {
//       simplifiedBudgetRange = 'small';
//     } else if (budgetRange.includes('Large')) {
//       simplifiedBudgetRange = 'large';
//     }

//     onSubmit({
//       technique: technique,
//       farmSize: parsedFarmSize,
//       budgetRange: simplifiedBudgetRange
//     });
//   };

//   // Budget range options
//   const budgetOptions = [
//     'Small Scale (< ₹5L)',
//     'Medium Scale (₹5L - ₹20L)',
//     'Large Scale (> ₹20L)'
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Smart Farming Techniques</Text>
//       <Text style={styles.subtitle}>Get AI-powered insights for modern farming implementation</Text>

//       <View style={styles.optionsContainer}>
//         <TouchableOpacity
//           style={[styles.optionButton, technique === 'organic_farming' && styles.selectedOption]}
//           onPress={() => setTechnique('organic_farming')}
//         >
//           <FarmingIcon type="organic" selected={technique === 'organic_farming'} />
//           <Text style={styles.optionText}>Organic Farming</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.optionButton, technique === 'rainwater_farming' && styles.selectedOption]}
//           onPress={() => setTechnique('rainwater_farming')}
//         >
//           <FarmingIcon type="rainwater" selected={technique === 'rainwater_farming'} />
//           <Text style={styles.optionText}>Rainwater Farming</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.optionButton, technique === 'fish_farming' && styles.selectedOption]}
//           onPress={() => setTechnique('fish_farming')}
//         >
//           <FarmingIcon type="fish" selected={technique === 'fish_farming'} />
//           <Text style={styles.optionText}>Fish Farming</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.optionButton, technique === 'other' && styles.selectedOption]}
//           onPress={() => setTechnique('other')}
//         >
//           <FarmingIcon type="other" selected={technique === 'other'} />
//           <Text style={styles.optionText}>Other</Text>
//         </TouchableOpacity>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Farm Size (in acres)"
//         value={farmSize}
//         onChangeText={setFarmSize}
//         keyboardType="numeric"
//       />

//       <View style={styles.dropdownContainer}>
//         <Pressable
//           style={styles.dropdown}
//           onPress={() => setShowDropdown(!showDropdown)}
//         >
//           <Text style={styles.dropdownText}>{budgetRange}</Text>
//           <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#333" />
//         </Pressable>

//         {/* Use Modal for dropdown to prevent positioning issues */}
//         <Modal
//           visible={showDropdown}
//           transparent={true}
//           animationType="fade"
//           onRequestClose={() => setShowDropdown(false)}
//         >
//           <Pressable
//             style={styles.modalOverlay}
//             onPress={() => setShowDropdown(false)}
//           >
//             <View style={[styles.dropdownMenu, { top: 0, left: 0, right: 0, position: 'relative' }]}
//               className='bg-green-600'>
//               {budgetOptions.map((option, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[
//                     styles.dropdownItem,
//                     option === budgetRange && styles.selectedDropdownItem
//                   ]}
//                   onPress={() => {
//                     setBudgetRange(option);
//                     setShowDropdown(false);
//                   }}
//                 >
//                   <Text style={[
//                     styles.dropdownItemText,
//                     option === budgetRange && styles.selectedDropdownItemText
//                   ]}>
//                     {option}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </Pressable>
//         </Modal>
//       </View>

//       <TouchableOpacity
//         style={styles.generateButton}
//         onPress={handleSubmit}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <Text style={styles.generateButtonText}>Analyzing...</Text>
//         ) : (
//           <>
//             <Ionicons name="analytics-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
//             <Text style={styles.generateButtonText}>Generate Analysis</Text>
//           </>
//         )}
//       </TouchableOpacity>
//       <View className='bg-white/70'></View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "rgba(255, 255, 255 , 0.6)",
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   optionButton: {
//     alignItems: 'center',
//     width: '22%',
//   },
//   selectedOption: {
//     opacity: 1,
//   },
//   optionText: {
//     marginTop: 8,
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#ffffff',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     backgroundColor: '#F8FAFC',
//   },
//   dropdownContainer: {
//     marginBottom: 24,
//     position: 'relative',
//     zIndex: 10,
//   },
//   dropdown: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#F8FAFC',
//   },
//   dropdownText: {
//     color: '#334155',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 20,
//   },
//   dropdownMenu: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     borderRadius: 8,
//     backgroundColor: '#FFFFFF',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   dropdownItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E2E8F0',
//   },
//   selectedDropdownItem: {
//     backgroundColor: '#059669',
//   },
//   dropdownItemText: {
//     color: '#334155',
//   },
//   selectedDropdownItemText: {
//     color: '#FFFFFF',
//   },
//   generateButton: {
//     backgroundColor: '#FFF8E7',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   generateButtonText: {
//     color: '#059669',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   buttonIcon: {
//     marginRight: 8,
//     color: "#059669"
//   },
// }); 

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Modal,
  Dimensions,
  ScrollView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import FarmingIcon from './FarmingIcon';

// Interface for component props
export interface FarmingFormProps {
  farmSize: string;
  setFarmSize: React.Dispatch<React.SetStateAction<string>>;
  cropType: string;
  setCropType: React.Dispatch<React.SetStateAction<string>>;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  selectedTechnique: string;
  setSelectedTechnique: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => Promise<void>;
}

// Budget ranges
const budgetRanges = [
  '₹10,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹5,00,000',
  '₹5,00,000+'
];

// Crop types
const cropTypes = [
  'Rice',
  'Wheat',
  'Corn',
  'Sugarcane',
  'Cotton',
  'Soybean',
  'Vegetables',
  'Fruits',
  'Pulses',
  'Others'
];

// Farming techniques data
const farmingTechniques = [
  {
    id: 'organic',
    name: 'Organic Farming',
    icon: 'leaf',
    description: 'Cultivation without synthetic chemicals'
  },
  {
    id: 'hydroponic',
    name: 'Hydroponic',
    icon: 'water',
    description: 'Growing plants without soil, using water-based nutrients'
  },
  {
    id: 'precision',
    name: 'Precision Agriculture',
    icon: 'satellite',
    description: 'Tech-driven approach for optimal resource management'
  },
  {
    id: 'permaculture',
    name: 'Permaculture',
    icon: 'sprout',
    description: 'Self-sustaining agricultural ecosystem'
  }
];

export default function FarmingForm({
  farmSize,
  setFarmSize,
  cropType,
  setCropType,
  budget,
  setBudget,
  selectedTechnique,
  setSelectedTechnique,
  onSubmit
}: FarmingFormProps) {
  // State for modals
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [cropModalVisible, setCropModalVisible] = useState(false);

  // Get screen dimensions for responsive design
  const screenWidth = Dimensions.get('window').width;

  // Button animation
  const buttonScale = useSharedValue(1);

  const handlePressIn = () => {
    buttonScale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    buttonScale.value = withTiming(1, { duration: 100 });
    onSubmit();
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }]
    };
  });

  return (
    <View style={styles.containerWrapper}>
      <Animated.View
        style={styles.container}
        entering={FadeIn.duration(800)}
      >
        <Text style={styles.title}>Smart Farming Assistant</Text>
        <Text style={styles.subtitle}>Generate personalized insights for your farm</Text>

        {/* Farming Techniques */}
        <View style={styles.formGroup}>
          <View style={styles.techniqueRow}>
            {farmingTechniques.map((technique) => (
              <FarmingIcon
                key={technique.id}
                type={technique.icon}
                label={technique.name}
                isSelected={selectedTechnique === technique.name}
                onPress={() => setSelectedTechnique(technique.name)}
              />
            ))}
          </View>
        </View>

        {/* Farm Size */}
        <View style={styles.formGroup} className=''>
          <Text style={styles.label}>Farm Size (in acres)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter farm size"
            value={farmSize}
            onChangeText={setFarmSize}
            keyboardType="numeric"
            placeholderTextColor="#A0AEC0"
          />
        </View>

        {/* Crop Type Selector */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Crop Type</Text>
          <Pressable
            style={styles.dropdown}
            onPress={() => {
              Keyboard.dismiss();
              setCropModalVisible(true);
            }}
          >
            <Text style={styles.dropdownText}>{cropType}</Text>
            <Ionicons name="chevron-down" size={24} color="#4A5568" />
          </Pressable>

          <Modal
            visible={cropModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setCropModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setCropModalVisible(false)}
            >
              <View
                style={[
                  styles.modalContent,
                  { width: screenWidth - 32 } // Adjust for responsive design
                ]}
              >
                <Text style={styles.modalTitle}>Select Crop Type</Text>
                <ScrollView style={styles.modalScroll}>
                  {cropTypes.map((item) => (
                    <Pressable
                      key={item}
                      style={[
                        styles.modalOption,
                        cropType === item && styles.modalOptionSelected
                      ]}
                      onPress={() => {
                        setCropType(item);
                        setCropModalVisible(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.modalOptionText,
                          cropType === item && styles.modalOptionTextSelected
                        ]}
                      >
                        {item}
                      </Text>
                      {cropType === item && (
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      )}
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </Pressable>
          </Modal>
        </View>

        {/* Budget Range Selector */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Budget Range</Text>
          <Pressable
            style={styles.dropdown}
            onPress={() => {
              Keyboard.dismiss();
              setBudgetModalVisible(true);
            }}
          >
            <Text style={styles.dropdownText}>{budget}</Text>
            <Ionicons name="chevron-down" size={24} color="#4A5568" />
          </Pressable>

          <Modal
            visible={budgetModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setBudgetModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setBudgetModalVisible(false)}
            >
              <View
                style={[
                  styles.modalContent,
                  { width: screenWidth - 32 } // Adjust for responsive design
                ]}
              >
                <Text style={styles.modalTitle}>Select Budget Range</Text>
                {budgetRanges.map((item) => (
                  <Pressable
                    key={item}
                    style={[
                      styles.modalOption,
                      budget === item && styles.modalOptionSelected
                    ]}
                    onPress={() => {
                      setBudget(item);
                      setBudgetModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        budget === item && styles.modalOptionTextSelected
                      ]}
                    >
                      {item}
                    </Text>
                    {budget === item && (
                      <Ionicons name="checkmark" size={20} color="#16a34a" />
                    )}
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>

        {/* Submit Button */}
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.button, buttonAnimatedStyle]}>
            <Text style={styles.buttonText}>Generate Insights</Text>
            <Ionicons name="analytics" size={20} color="white" />
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  container: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  techniqueRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1E293B',
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalOptionSelected: {
    backgroundColor: '#dcfce7',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#334155',
  },
  modalOptionTextSelected: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
}); 