import { FocusCards } from "./ui/focus-cards.jsx";



 function FocusCardsDemo() {
  const cards = [
    {
      title: "",
      src: 'https://www.karikala.in/blog/wp-content/uploads/2024/07/Banner1.png',
      link: "https://www.cpcb.nic.in/water-act-1974/" // Central Pollution Control Board
    },
    {
      title: "",
      src: '',
      link: "https://www.cpcb.nic.in/air-act-1981/" // Central Pollution Control Board
    },
    {
      title: "",
      src: '',
      link: "https://www.moef.gov.in/en/legislations/environment-protection-act-1986/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: '',
      link: "https://www.cpcb.nic.in/noise-pollution-regulation-and-control-rules-2000/" // Central Pollution Control Board
    },
    {
      title: "",
      src: '',
      link: "https://www.moef.gov.in/en/waste-management/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: '',
      link: "https://www.mca.gov.in/MinistryV2/publicliabilityinsuranceact.html" // Ministry of Corporate Affairs
    },
    {
      title: "",
      src: '',
      link: "https://www.cpcb.nic.in/plastic-ban/" // Central Pollution Control Board
    },
    {
      title: "",
      src: '',
      link: "https://www.moeff.gov.in/en/tree-plantation/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: '',
      link: "https://www.moeff.gov.in/en/solar-energy/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: '',
      link: "https://www.moeff.gov.in/en/rainwater-harvesting/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: '',
      link: "https://www.cpcb.nic.in/waste-segregation/" // Central Pollution Control Board
    },
    {
      title: "",
      src: '',
      link: "https://www.moeff.gov.in/en/public-transport/" // Ministry of Environment, Forest and Climate Change
    },
  ];

  return <FocusCards cards={cards} />;
}

export default FocusCardsDemo
