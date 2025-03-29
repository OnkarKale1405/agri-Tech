import { createContext, useContext, useState } from "react";

// Create the Farming Context
const FarmingContext = createContext();

// Provider Component
export const FarmingProvider = ({ children }) => {

    const [farmingCourses, setFarmingCourses] = useState([
        {
            id: 1,
            category: "Smart & Organic Farming",
            image: "https://images.unsplash.com/photo-1529313780224-1a12b68bed16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JnYW5pYyUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D",
            title: "Organic Farming for Sustainable Yield",
            description: "Learn chemical-free farming techniques using cow dung, vermicompost, and natural pest control for healthier crops.",
            lessons: 10,
            progress: 25,
            students: 3024,
            rating: 4.6,
            difficulty: "Beginner",
            color: "bg-green-600",
            icon: "🌱",
            modules: [
                {
                    id: 1,
                    title: "Vermicomposting & Organic Manures",
                    description: "Discover how to convert agricultural waste into nutrient-rich vermicompost using earthworms, a cost-effective alternative to chemical fertilizers. Learn the ideal moisture and temperature conditions for maintaining a healthy worm bin, and how to mix cow dung, crop residue, and kitchen waste for optimal decomposition. This module also covers the use of Jivamrit (a fermented microbial solution) to enhance soil fertility and crop immunity naturally.",
                    duration: "15 Minutes",
                    questions: 8,
                    completed: true,
                    video: "https://res.cloudinary.com/dmrktoeyw/video/upload/v1743115368/rrghz8uw38ibghvvljmo.mp4",
                    learnings: [
                        {
                            timestamp: "00:03",
                            title: "Understanding the Importance of Land Selection",
                            learning: "Why choosing the right farmland is crucial for successful farming. The speaker shares personal experience of purchasing farmland surrounded by pesticide-intensive monoculture."
                        },
                        {
                            timestamp: "00:40",
                            title: "Define Your Purpose Before Buying",
                            learning: "Importance of understanding why you are purchasing farmland. Land selection based on intended agricultural use."
                        },
                        {
                            timestamp: "01:14",
                            title: "Climate Suitability for Crops",
                            learning: "Matching crop selection with climate conditions. Choosing the right location based on weather patterns."
                        },
                        {
                            timestamp: "01:49",
                            title: "Water Availability & Quality",
                            learning: "Assessing water sources: Borewells, rivers, and rainfall dependency. Ensuring water is free from pollutants and heavy metals."
                        },
                        {
                            timestamp: "02:25",
                            title: "Wildlife & Pest Management",
                            learning: "Common threats: Deer, elephants, and monkeys. Legal restrictions on handling wildlife. Eco-friendly solutions for crop protection."
                        },
                        {
                            timestamp: "02:56",
                            title: "Importance of Soil and Water Testing",
                            learning: "Testing nearby borewell water for excessive salts and contamination. How poor water quality can affect soil pH and long-term farming."
                        },
                        {
                            timestamp: "03:30",
                            title: "Checking for Soil Contamination",
                            learning: "Conducting chemical tests to detect past use of pesticides and fertilizers. Identifying land previously treated with heavy chemicals and making it suitable for organic farming."
                        },
                        {
                            timestamp: "04:03",
                            title: "Evaluating Neighboring Farmland",
                            learning: "Understanding pesticide usage in neighboring farms. Creating natural wind barriers to protect crops from airborne chemicals."
                        },
                        {
                            timestamp: "04:37",
                            title: "Proximity to Markets",
                            learning: "Trade-off between farmland cost and transportation expenses. Challenges of farming in remote, nature-rich areas."
                        },
                        {
                            timestamp: "05:10",
                            title: "Commercial vs. Hobby Farming",
                            learning: "Choosing between self-sustaining hobby farms and profitable commercial farms. Recommended location: Within a 100 km radius of major cities for better market access."
                        },
                        {
                            timestamp: "05:41",
                            title: "Understanding Local Farming Challenges",
                            learning: "Meeting local farmers to learn about labor issues, workforce availability, and regional farming laws."
                        },
                        {
                            timestamp: "06:19",
                            title: "Realities of Farming as a Business",
                            learning: "Why many farmers maintain a secondary job for financial stability. Common struggles in making farming a full-time sustainable profession."
                        },
                        {
                            timestamp: "06:54",
                            title: "Final Advice Before Buying Land",
                            learning: "Visit farms in the area and speak with experienced farmers. Work on a farm before buying to understand daily farming operations."
                        }
                    ],
                },
                {
                    id: 2,
                    title: "Embracing Organic Farming for Sustainable Living",
                    description: "This transcript explores the principles and benefits of organic farming, highlighting its role in sustainable agriculture and environmental conservation. It discusses natural composting methods, soil health, and the importance of chemical-free farming in promoting biodiversity. The conversation also emphasizes self-sufficiency, traditional knowledge, and the long-term advantages of organic food production for both human health and the ecosystem.",
                    duration: "12:31 Minutes",
                    questions: 6,
                    completed: true,
                    video: "https://res.cloudinary.com/dmrktoeyw/video/upload/v1743119610/mxxf4gnhffckwbvoq1d8.mp4",
                    learnings: [
                        {
                            title: "Sustainable Living and Organic Farming",
                            learning: "Building homes with natural materials and practicing organic farming benefits both humans and the ecosystem by providing food for butterflies, bees, and birds.",
                            timestamp: "00:14"
                        },
                        {
                            title: "Supporting Children from Distressed Backgrounds",
                            learning: "Karm Marg provides a home for children facing trauma and health issues, offering them long-term care until they become self-sufficient.",
                            timestamp: "01:04"
                        },
                        {
                            title: "Self-Sufficiency in Food Production",
                            learning: "Growing vegetables for personal consumption evolved into a larger-scale production, eliminating dependence on markets for food.",
                            timestamp: "01:55"
                        },
                        {
                            title: "Regenerating Barren Land for Farming",
                            learning: "A long-term process of allowing natural mulching and crop rotation transformed barren land into fertile soil for vegetable farming.",
                            timestamp: "02:29"
                        },
                        {
                            title: "Seasonal Eating and Seed Collection",
                            learning: "Eating only what grows locally and naturally in each season ensures the best quality produce and reduces reliance on external markets.",
                            timestamp: "03:36"
                        },
                        {
                            title: "Crop Rotation and Organic Farming Expertise",
                            learning: "Rotating crops seasonally helps maintain soil fertility, and experienced farmers play a crucial role in sustaining organic farming.",
                            timestamp: "04:08"
                        },
                        {
                            title: "Enriching Soil with Natural Compost",
                            learning: "Homemade compost using cow-dung, dry leaves, and natural fertilizers has significantly improved soil fertility over time.",
                            timestamp: "05:23"
                        },
                        {
                            title: "Integrating Nature and Farming",
                            learning: "A well-planned farm includes shade-providing trees, flowering plants for pollinators, and fruit trees that benefit both humans and wildlife.",
                            timestamp: "06:13"
                        },
                        {
                            title: "Permaculture and Ecosystem Conservation",
                            learning: "Creating an ecosystem that supports birds, insects, and plants ensures sustainability and reduces the human impact on nature.",
                            timestamp: "08:09"
                        },
                        {
                            title: "Health Benefits of Organic Living",
                            learning: "Switching to organic farming has led to reduced medical expenses, improved children's health, and increased awareness of medicinal plants.",
                            timestamp: "10:11"
                        }
                    ]

                },
                {
                    id: 3,
                    title: "Transition from Corporate Life to Organic Farming",
                    description: "This segment narrates the journey of Devdas Shetty’s son, who left his engineering career in Bangalore to pursue agriculture on their family’s land. Despite initial reluctance, Devdas supported his son’s decision, eventually finding joy in his son’s dedication to farming. This story highlights the shift of younger generations towards sustainable, independent livelihoods.",
                    duration: "41:41 Minutes",
                    questions: 5,
                    video: "https://res.cloudinary.com/dmrktoeyw/video/upload/v1743121295/vswa0vpdkxyfkupwbeep.mp4",
                    completed: false,
                    learnings: [
                        {
                            title: "Choosing Passion Over Profession",
                            learning: "Leaving a stable corporate job to pursue one's passion in farming can lead to a more fulfilling and self-sufficient life.",
                            timestamp: "01:11"
                        },
                        {
                            title: "Independence in Work",
                            learning: "Self-employment in farming provides freedom from corporate structures and allows greater control over one's livelihood.",
                            timestamp: "01:30"
                        },
                        {
                            title: "Family Support in Career Transition",
                            learning: "Parental encouragement and support play a crucial role in enabling young individuals to follow unconventional career paths.",
                            timestamp: "01:45"
                        },
                        {
                            title: "Reviving Traditional Farming",
                            learning: "Many young professionals are returning to agriculture, combining modern knowledge with traditional farming techniques.",
                            timestamp: "02:10"
                        },
                        {
                            title: "Satisfaction in Farming",
                            learning: "Engaging in agriculture not only provides financial independence but also a deep sense of satisfaction and connection with nature.",
                            timestamp: "02:30"
                        }
                    ]

                }
            ]
        },
        {
            id: 2,
            category: "Modern Irrigation & Water Conservation",
            title: "Drip Irrigation & Water Savings",
            description: "Master water-efficient techniques like drip/sprinkler irrigation and rainwater harvesting.",
            lessons: 8,
            progress: 20,
            students: 1034,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1663079402880-97a2e68aafc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW9kZXJuJTIwSXJyaWdhdGlvbiUyMCUyNiUyMFdhdGVyJTIwQ29uc2VydmF0aW9ufGVufDB8fDB8fHww",
            difficulty: "Intermediate",
            color: "bg-green-600",
            icon: "💧",
            modules: [
                {
                    id: 1,
                    title: "Drip System Setup (Subsidy Schemes)",
                    description: "Step-by-step guidance on designing a drip irrigation system tailored to crops like sugarcane, cotton, or vegetables, including emitter spacing and pressure requirements. Learn how to claim 50–90% subsidies under the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) by submitting land records and project estimates to agriculture departments. The module also covers maintenance tips to prevent clogging and leaks, ensuring long-term efficiency.",
                    duration: "16:40 Minutes",
                    questions: 7,
                    completed: true
                },
                {
                    id: 2,
                    title: "Rainwater Harvesting for Farms",
                    description: "Explore traditional and modern rainwater harvesting methods, such as building farm ponds, check dams, and percolation pits, to recharge groundwater and combat drought. Learn how to calculate catchment area and storage needs based on regional rainfall data (e.g., using IMD reports). The module includes case studies from Rajasthan’s ‘Johads’ and Tamil Nadu’s community-led water conservation success stories.",
                    duration: "15 Minutes",
                    questions: 5,
                    completed: false
                },
                {
                    id: 3,
                    title: "Solar-Powered Water Pumps",
                    description: "Reduce electricity costs by switching to solar pumps under the KUSUM Scheme, which offers 90% subsidies to small farmers. Compare submersible vs. surface pumps for different water table depths and learn sizing (HP requirements) based on crop area. The module also explains grid-connected systems that allow farmers to sell excess solar power to DISCOMs for additional income.",
                    duration: "12 Minutes",
                    questions: 6,
                    completed: false
                }
            ]
        },
        {
            id: 3,
            category: "Precision Farming",
            title: "Tech-Driven Farming with Sensors & Drones",
            description: "Use soil sensors, weather data, and AI tools to optimize inputs and maximize yield.",
            lessons: 12,
            progress: 10,
            rating: 4.7,
            image: "https://plus.unsplash.com/premium_photo-1661813608341-47567ad0f1ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFByZWNpc2lvbiUyMEZhcm1pbmd8ZW58MHx8MHx8fDA%3D",
            students: 201,
            difficulty: "Advanced",
            color: "bg-green-600",
            icon: "📡",
            modules: [
                {
                    id: 1,
                    title: "Soil Moisture Sensors & IoT",
                    description: "Deploy affordable IoT-based soil sensors (like those from Fasal or CropIn) to monitor real-time moisture, temperature, and nutrient levels, sending alerts to your phone. Learn calibration techniques to ensure accuracy and integrate data with drip systems for automated irrigation. The module also covers government initiatives like Digital Agriculture Mission promoting sensor adoption with 50% subsidies.",
                    duration: "18 Minutes",
                    video: "https://res.cloudinary.com/dmrktoeyw/video/upload/v1743133563/qohod0ajwpcqev4sj2hn.mp4",
                    questions: 8,
                    completed: false
                },
                {
                    id: 2,
                    title: "Drone Spraying for Pesticides",
                    description: "Understand drone types (e.g., AG-365 from Garuda Aerospace) suitable for spraying pesticides in fields, including battery life and coverage area calculations. Navigate DGCA licensing requirements and avail 75% subsidies under the SMAM scheme for drone purchases. Practical tips include flight planning, nozzle selection, and safety protocols to avoid chemical drift.",
                    duration: "15 Minutes",
                    questions: 6,
                    completed: false
                },
                {
                    id: 3,
                    title: "AI-Based Crop Advisory (e.g., KisanGPT)",
                    description: "Use AI tools like IBM’s Watson or KisanGPT (available in Hindi/Telugu) to diagnose crop diseases from uploaded photos and get localized treatment advice. Learn how AI-driven weather forecasts can predict monsoon patterns and pest outbreaks, helping farmers plan sowing/harvesting. The module also explores chatbot platforms like AgriApp that provide real-time market prices for crops.",
                    duration: "10 Minutes",
                    questions: 4,
                    completed: false
                }
            ]
        },
        {
            id: 4,
            category: "Hydroponics & Vertical Farming",
            title: "Soilless Farming for Urban Areas",
            description: "Grow leafy greens and herbs hydroponically in limited spaces using minimal water.",
            lessons: 9,
            progress: 15,
            students: 10021,
            image: "https://plus.unsplash.com/premium_photo-1663013274072-4844d1eac1d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fEh5ZHJvcG9uaWNzJTIwJTI2JTIwVmVydGljYWwlMjBGYXJtaW5nJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D",
            rating: 4.3,
            difficulty: "Intermediate",
            color: "bg-green-600",
            icon: "🏙️",
            modules: [
                {
                    id: 1,
                    title: "Low-Cost Hydroponic Setup (PVC Pipes)",
                    description: "Build a DIY hydroponic system using PVC pipes, grow trays, and recycled containers, ideal for urban balconies or terraces. Learn how to select crops like lettuce, spinach, or basil that thrive in water-based systems, and the importance of pH balance (5.5–6.5) for nutrient absorption. The module includes cost breakdowns (under ₹5,000 for a 10-pipe setup) and maintenance routines to prevent algae growth.",
                    duration: "20 Minutes",
                    questions: 7,
                    completed: false
                },
                {
                    id: 2,
                    title: "Nutrient Solution Management",
                    description: "Master the art of mixing hydroponic nutrients using locally available NPK fertilizers and micronutrients like calcium and magnesium. Understand how to adjust solutions for different growth stages (seedling, vegetative, flowering) and troubleshoot deficiencies (e.g., yellowing leaves). The module provides recipes for organic nutrient solutions using compost tea or fish emulsion for chemical-free farming.",
                    duration: "12 Minutes",
                    questions: 5,
                    completed: false
                },
                {
                    id: 3,
                    title: "Vertical Farming for Terrace Gardens",
                    description: "Design space-saving vertical farms using stackable trays, tower gardens, or hanging sacks to grow 10x more produce in small areas. Learn about LED grow lights (optimal spectrums for leafy greens vs. fruiting plants) and their electricity costs in Indian conditions. Includes success stories from Mumbai’s urban farmers growing strawberries and cherry tomatoes vertically.",
                    duration: "15 Minutes",
                    questions: 6,
                    completed: false
                }
            ]
        },
        {
            id: 5,
            category: "Solar-Powered & Automation Farming",
            title: "Renewable Energy for Farms",
            description: "Harness solar energy for irrigation, fencing, and cold storage to cut costs.",
            lessons: 7,
            progress: 5,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1670519808728-335b1eb2ef52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U29sYXIlMjBQb3dlcmVkJTIwJTI2JTIwQXV0b21hdGlvbiUyMEZhcm1pbmclMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D",
            students: 1235,
            difficulty: "Intermediate",
            color: "bg-green-600",
            icon: "☀️",
            modules: [
                {
                    id: 1,
                    title: "Solar Dryers for Post-Harvest Processing",
                    description: "Construct solar dryers using bamboo, mesh, and transparent sheets to dehydrate fruits, vegetables, and spices without losing nutritional value. Learn temperature control techniques (45–60°C) to preserve color and flavor in produce like mangoes, turmeric, or chilies. The module compares solar drying with traditional sun-drying methods and highlights FPOs (Farmer Producer Organizations) offering collective drying facilities.",
                    duration: "15 Minutes",
                    questions: 5,
                    completed: false
                },
                {
                    id: 2,
                    title: "Automated Solar Fencing (Crop Protection)",
                    description: "Install solar-powered electric fences (2–5 kV) to protect crops from wild boars, monkeys, and stray cattle, common challenges in Indian farms. Learn how to set up energizers, grounding systems, and warning signs, complying with local safety regulations. The module includes cost estimates (₹50–80/meter) and subsidies available under state agricultural schemes.",
                    duration: "10 Minutes",
                    questions: 4,
                    completed: false
                },
                {
                    id: 3,
                    title: "Kisan Solar Pump Yojana Benefits",
                    description: "Avail the KUSUM Scheme’s 90% subsidy for solar pumps (up to 10 HP) by submitting applications through state agriculture portals. Understand the difference between off-grid and grid-connected pumps, and how to sell surplus solar power to DISCOMs for extra income. Includes tips on selecting reputable vendors and maintaining solar panels for monsoon and dust conditions.",
                    duration: "12 Minutes",
                    questions: 6,
                    completed: false
                }
            ]
        },
        {
            id: 6,
            category: "Biotechnology & GMO Crops",
            title: "High-Yield & Pest-Resistant Crops",
            description: "Understand BT cotton, biofortified crops, and GM regulations in India.",
            lessons: 6,
            progress: 0,
            image: "https://plus.unsplash.com/premium_photo-1664301324141-c7f0229ca1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEJpb3RlY2hub2xvZ3klMjAlMjYlMjBHTU8lMjBDcm9wcyUyMGluZGlhfGVufDB8fDB8fHww",
            rating: 4.0,
            students: 1223,
            difficulty: "Advanced",
            color: "bg-green-600",
            icon: "🧬",
            modules: [
                {
                    id: 1,
                    title: "BT Cotton Cultivation Best Practices",
                    description: "Maximize yields of BT cotton by adhering to recommended sowing dates (June–July for North India), spacing (90x90 cm), and refugia planting (20% non-BT cotton) to delay pest resistance. Learn how to identify and manage pink bollworm outbreaks, a growing threat due to improper BT gene usage. The module also covers integrated pest management (IPM) strategies to reduce chemical sprays.",
                    duration: "15 Minutes",
                    questions: 6,
                    completed: false
                },
                {
                    id: 2,
                    title: "Biofortified Crops (e.g., Zinc-Rice, Iron-Wheat)",
                    description: "Adopt ICAR-approved biofortified varieties like DRR Dhan 45 (zinc-rich rice) and HI 8627 (high-iron wheat) to address malnutrition in rural communities. Learn cultivation practices tailored to these varieties, including soil zinc supplementation and staggered sowing for optimal nutrient uptake. The module highlights government programs distributing free biofortified seeds to smallholders.",
                    duration: "10 Minutes",
                    questions: 5,
                    completed: false
                },
                {
                    id: 3,
                    title: "GM Crop Regulations in India",
                    description: "Navigate India’s complex GM crop approval process, including GEAC (Genetic Engineering Appraisal Committee) trials and state-level bans. Analyze case studies of BT brinjal (banned) and DMH-11 mustard (approved), and their implications for future GM crops. The module also discusses labeling laws for GM foods and consumer awareness challenges.",
                    duration: "12 Minutes",
                    questions: 4,
                    completed: false
                }
            ]
        },
        {
            id: 7,
            category: "Sustainable Farming",
            title: "Zero-Budget Natural Farming (ZBNF)",
            description: "Adopt Subhash Palekar’s techniques using Bijamrit, Jivamrit, and mulching.",
            lessons: 8,
            progress: 10,
            image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3VzdGFpbmFibGUlMjBGYXJtaW5nfGVufDB8fDB8fHww",
            students: 3024,
            rating: 4.8,
            difficulty: "Beginner",
            color: "bg-green-600",
            icon: "♻️",
            modules: [
                {
                    id: 1,
                    title: "ZBNF Preparations (Bijamrit, Jivamrit)",
                    description: "Prepare Bijamrit (seed treatment with cow dung, urine, lime) and Jivamrit (fermented microbial culture) to replace synthetic fertilizers and boost soil health. Learn the exact ratios (e.g., 10L water + 5kg cow dung + 5L cow urine) and fermentation timelines (3–7 days). The module includes videos demonstrating application techniques for seeds, saplings, and standing crops.",
                    duration: "15 Minutes",
                    questions: 7,
                    completed: false
                },
                {
                    id: 2,
                    title: "Intercropping with Pulses & Oilseeds",
                    description: "Design intercropping systems like maize + pigeon pea or wheat + mustard to improve soil nitrogen, reduce pests, and diversify income. Learn spacing patterns (e.g., 2:1 row ratios) and compatible crop pairs based on root depth and canopy structure. Includes case studies from Andhra Pradesh’s ZBNF farmers achieving 20% higher profits with intercropping.",
                    duration: "12 Minutes",
                    questions: 5,
                    completed: false
                },
                {
                    id: 3,
                    title: "PM-PRANAM Scheme for ZBNF",
                    description: "Access subsidies under the PM-PRANAM (Promotion of Alternate Nutrients for Agriculture Management) scheme for transitioning to chemical-free farming. Learn documentation requirements (land records, input reduction proofs) and how to apply through Krishi Vigyan Kendras (KVKs). The module also covers state-specific incentives, like Andhra’s 100% subsidy for ZBNF inputs.",
                    duration: "10 Minutes",
                    questions: 4,
                    completed: false
                }
            ]
        },
        {
            id: 8,
            category: "Aquaponics & Integrated Farming Systems (IFS)",
            title: "Fish-Vegetable Integrated Farming",
            description: "Combine aquaculture with crop cultivation for circular economy benefits.",
            lessons: 9,
            progress: 5,
            rating: 4.2,
            students: 323,
            image: "https://images.unsplash.com/photo-1551966769-0506f56f05e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXF1YXBvbmljcyUyMCUyNiUyMEludGVncmF0ZWQlMjBGYXJtaW5nJTIwU3lzdGVtcyUyMChJRlMpfGVufDB8fDB8fHww",
            difficulty: "Intermediate",
            color: "bg-green-600",
            icon: "🐟",
            modules: [
                {
                    id: 1,
                    title: "Low-Cost Aquaponics (PVC + Fish Tanks)",
                    description: "Set up a small-scale aquaponics unit using PVC grow beds and a 500L fish tank (tilapia or catfish), where fish waste fertilizes plants like mint or okra. Learn water cycling (pH 6.5–7.0), fish feed ratios (2–3% body weight daily), and troubleshooting ammonia spikes. The module includes a cost-benefit analysis showing 30% higher returns compared to traditional farming.",
                    duration: "20 Minutes",
                    questions: 8,
                    completed: false
                },
                {
                    id: 2,
                    title: "Integrated Farming: Poultry + Crops + Fisheries",
                    description: "Design a symbiotic IFS model where poultry waste feeds fish, and pond silt fertilizes crops like bananas or coconuts. Calculate ideal ratios (e.g., 100 birds + 0.1-hectare pond + 0.5-acre crops) for optimal resource use. Includes examples from West Bengal’s successful 'Poultry-Fish-Vegetable' clusters supported by NABARD.",
                    duration: "15 Minutes",
                    questions: 6,
                    completed: false
                },
                {
                    id: 3,
                    title: "Profitability of IFS (Case Studies)",
                    description: "Analyze real-world IFS models like Bihar’s 'Duck-Fish-Rice' system (30% higher income) and Kerala’s Pokkali rice-shrimp farming (salt-tolerant varieties). Learn how to access bank loans under KCC (Kisan Credit Card) for IFS setups and market linkages through FPOs. The module also covers risk management strategies for multi-component farming.",
                    duration: "12 Minutes",
                    questions: 5,
                    completed: false
                }
            ]
        }
    ]);

    const getCourseById = (courseId) => {
        return farmingCourses.find(course => course.id === courseId);
    };

    const getModuleById = (courseId, moduleId) => {

        courseId = Number(courseId);
        moduleId = Number(moduleId);

        const course = farmingCourses.find(course => course.id === courseId);

        if (!course) {
            console.warn(`Course with ID ${courseId} not found.`);
            return null;
        }

        // console.log("Found Course:", course);

        const module = course.modules.find(module => module.id === moduleId);

        if (!module) {
            console.warn(`Module with ID ${moduleId} not found in course ${courseId}.`);
            return null;
        }

        // console.log("Found Module:", module);
        return module;
    };


    // Toggle completion state of a module
    const toggleModuleCompletion = (courseId, moduleId) => {
        setFarmingCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === courseId
                    ? {
                        ...course,
                        modules: course.modules.map(module =>
                            module.id === moduleId
                                ? { ...module, completed: !module.completed }
                                : module
                        )
                    }
                    : course
            )
        );
    };

    return (
        <FarmingContext.Provider value={{
            farmingCourses,
            setFarmingCourses,
            getCourseById,
            getModuleById,
            toggleModuleCompletion
        }}>
            {children}
        </FarmingContext.Provider>
    );
};

// Custom Hook for using the Farming Context
export const useFarming = () => {
    return useContext(FarmingContext);
};
