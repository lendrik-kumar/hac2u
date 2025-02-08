import { AnimatedTestimonials } from '../../components/ui/AnimatedTestimonials.jsx'
import image3 from '../../assets/image3.jpg'
import image4 from '../../assets/image4.png'
import image5 from '../../assets/image5.png'
import image6 from '../../assets/image6.png'
import image7 from '../../assets/image7.png'
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision.jsx";

function App() {
  const testimonials = [
    {


      quote: "Chandigarh has faced significant challenges in maintaining its green spaces due to rapid urbanization and population growth. The city has witnessed a decline in its natural habitats, leading to concerns about biodiversity loss and environmental degradation. However, in response to these challenges, Chandigarh has successfully implemented extensive landscaping projects and developed numerous parks and gardens, such as the iconic Zakir Hussain Rose Garden, which is renowned for its diverse collection of roses and serves as a vital recreational space for residents. Additionally, initiatives like community tree planting drives and educational programs on environmental conservation have fostered a culture of sustainability among citizens. This commitment to preserving green spaces not only enhances the urban landscape but also provides vital habitats for local wildlife, contributing to the ecological balance. Through these efforts, Chandigarh has transformed into a model city for environmental sustainability, showcasing how urban areas can harmoniously coexist with nature.",
      name: "Environmental Activist",
      designation: "Green Space Advocate",
      src: image3,
      link: "https://chandigarh.gov.in/green-chandigarh", // Replace with the actual link
    },
    {
      quote: "Chandigarh has faced significant waste management challenges, leading to pollution and health hazards due to rapid urbanization and population growth. In response, the city implemented a comprehensive waste management strategy focusing on source segregation, composting, and recycling. By educating residents on waste separation, Chandigarh has empowered citizens to participate actively in waste management. The establishment of advanced waste processing plants has reduced landfill waste and transformed it into valuable resources like compost and energy, promoting a circular economy. Through these efforts, Chandigarh has become a model for effective waste management, showcasing its importance for a sustainable urban future.",
      name: "Urban Planner",
      designation: "Sustainable Development Expert",
      src: image4,
      link: "https://chandigarhenvis.gov.in/sites/default/files/Newsletters/NL07092020.pdf", // Replace with the actual link
    },
    {
      quote: "Chandigarh's rapid development has threatened its biodiversity, leading to habitat degradation and a decline in local flora and fauna. Known for its blend of urban planning and nature, the city has struggled to maintain ecological balance. In response, Chandigarh has launched conservation programs to protect vital ecosystems like Sukhna Lake, a habitat for migratory birds and aquatic species. Initiatives include habitat restoration, pollution control, and community engagement in conservation efforts. The establishment of green corridors and parks has improved wildlife connectivity, allowing species to thrive in urban areas. These initiatives demonstrate Chandigarh's commitment to balancing urban growth with ecological preservation, setting an example for other cities on how urban environments can coexist with nature.",
      name: "Biodiversity Researcher",
      designation: "Conservation Biologist",
      src: image5,
      link: "https://chandigarh.gov.in/restoration-of-biodiversity", // Replace with the actual link
    },
    {
      quote: "Chandigarh's urban planning has a rich history, initially designed by the renowned architect Le Corbusier in the 1950s. However, as the city has rapidly expanded over the decades, it faced criticism for neglecting green belts and open spaces, which are essential for maintaining ecological balance and enhancing the quality of life. Recognizing these challenges, city planners have taken significant steps to integrate green architecture and sustainable practices into new developments. Current initiatives include the creation of extensive parks, green corridors, and urban forests that not only beautify the city but also serve as vital lungs for urban air quality. Furthermore, Chandigarh is committed to future-proofing its urban landscape by incorporating smart city concepts that prioritize sustainability, such as rainwater harvesting, solar energy utilization, and efficient waste management systems. This holistic approach not only enhances the quality of life for residents but also sets a precedent for future urban developments, ensuring that Chandigarh remains a model of sustainable urban living for generations to come.",
      name: "City Planner",
      designation: "Urban Development Specialist",
      src: image6,
      link: "https://chandigarh.gov.in/departments/other-departments/urban-planning", // Replace with the actual link
    },
    {
      quote: "Chandigarh has faced significant traffic congestion and air pollution due to rapid urbanization and increased vehicle ownership. Initially designed for smooth traffic flow, the city's growth has led to more vehicles and pollution. In response, Chandigarh has invested in sustainable transportation, developing dedicated cycling lanes to promote eco-friendly commuting and introducing electric buses to enhance public transport. These initiatives aim to reduce carbon emissions and encourage healthier lifestyles. Looking ahead, Chandigarh plans to expand its cycling infrastructure and improve public transport connectivity, reinforcing its commitment to sustainable urban mobility and setting an example for other cities.",
      name: "Transport Planner",
      designation: "Sustainable Mobility Advocate",
      src: image7,
      link: "http://chdtransport.gov.in/", // Replace with the actual link
    },
  ];

  return <BackgroundBeamsWithCollision> <AnimatedTestimonials testimonials={testimonials}/> </BackgroundBeamsWithCollision>;
}

export default App;
