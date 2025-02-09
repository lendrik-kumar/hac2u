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
      src: 'https://slideplayer.com/slide/10932565/39/images/13/Environmental+Laws+and+Rules.jpg',
      link: "https://www.cpcb.nic.in/air-act-1981/" // Central Pollution Control Board
    },
    {
      title: "",
      src: 'https://www.lexisnexis.in/blogs/wp-content/uploads/2023/11/Environmental-Laws-in-India.png',
      link: "https://www.moef.gov.in/en/legislations/environment-protection-act-1986/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: 'https://cpcb.nic.in/images/golden_jubilee_logo.png',
      link: "https://www.cpcb.nic.in/noise-pollution-regulation-and-control-rules-2000/" // Central Pollution Control Board
    },
    {
      title: "",
      src: 'https://cdn.slidesharecdn.com/ss_thumbnails/salientprovisionsofwateract-181114193739-thumbnail.jpg?width=560&fit=bounds',
      link: "https://www.moef.gov.in/en/waste-management/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: 'https://image.slidesharecdn.com/environmentallegislationenvironmentalpoliciesofgovernmentenvironmentallawsandinternationalconvention-230413103613-55c63ac7/85/Environmental-legislation-Environmental-Policies-of-Government-Environmental-Laws-and-International-conventions-pptx-28-320.jpg',
      link: "https://www.mca.gov.in/MinistryV2/publicliabilityinsuranceact.html" // Ministry of Corporate Affairs
    },
    {
      title: "",
      src: 'https://imgv2-2-f.scribdassets.com/img/document/434498894/original/efa13ac770/1?v=1',
      link: "https://www.cpcb.nic.in/plastic-ban/" // Central Pollution Control Board
    },
    {
      title: "",
      src: 'https://image.slidesharecdn.com/environmentallegislation-151017043713-lva1-app6891/85/Environmental-legislation-3-320.jpg',
      link: "https://www.moeff.gov.in/en/tree-plantation/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: 'https://www.investopedia.com/thmb/ILZB8hYwyeS4MVpZCbZ_yRcc9pQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ESG-final-fc9c8799d2d34234a895cbab621c21ad.png',
      link: "https://www.moeff.gov.in/en/solar-energy/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: 'https://i.ytimg.com/vi/LeLddcbSAU8/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGCAgVyh_MA8=&rs=AOn4CLCfS8eKvoTD5ceXdUZ8BEfNIOEM6Q',
      link: "https://www.moeff.gov.in/en/rainwater-harvesting/" // Ministry of Environment, Forest and Climate Change
    },
    {
      title: "",
      src: 'https://ars.els-cdn.com/content/image/3-s2.0-B9780128023280000188-f18-03-9780128023280.jpg',
      link: "https://www.cpcb.nic.in/waste-segregation/" // Central Pollution Control Board
    },
    {
      title: "",
      src: 'https://slideplayer.com/slide/3746024/13/images/10/Indian+Environmental+Law.jpg',
      link: "https://www.moeff.gov.in/en/public-transport/" // Ministry of Environment, Forest and Climate Change
    },
  ];

  return <FocusCards cards={cards} />;
}

export default FocusCardsDemo
