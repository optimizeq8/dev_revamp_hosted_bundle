var fs = require("fs");
var fuzz = require("fuzzball");

let filenames = [
  "Accounting",
  "Advertising",
  "Agriculture",
  "ArchitecturalService",
  "Arts",
  "Automotive",
  "BeautyProducts",
  "BooksMagazines",
  "Builder",
  "BusinessConsulting",
  "Construction",
  "Education",
  "FinanceInvestments",
  "Fitness",
  "FoodBeverage",
  "Games",
  "Government",
  "HealthCare",
  "HealthServices",
  "HomeBusiness",
  "Hospitality",
  "Insurance",
  "IT",
  "LegalServices",
  "Entertainment",
  "Manufacturing",
  "MedicalProducts",
  "MusicProduction",
  "Nonprofit",
  "OilGas",
  "Pharmaceutical",
  "Radio",
  "RealEstate",
  "RentalLeasing",
  "RetailClothing",
  "RetailElectronics",
  "RetailFurniture",
  "RetailOther",
  "RetailSportsEquipment",
  "RetailWholesale",
  "SportsEsports",
  "SportsMotorsports",
  "TechBusiness",
  "Telecommunications",
  "TravelTourism",
  "TVProduction",
  "Other"
];

let businesses = [
  {
    label: "Accounting",
    value: "0"
  },
  {
    label: "Advertising/Public Relations",
    value: "1"
  },
  {
    label: "Agriculture",
    value: "2"
  },
  {
    label: "Architectural Service",
    value: "3"
  },
  {
    label: "Arts",
    value: "4"
  },
  {
    label: "Automotive",
    value: "5"
  },
  {
    label: "Beauty Products",
    value: "6"
  },
  {
    label: "Books, Magazines, & Newspapers",
    value: "7"
  },
  {
    label: "Builder/General Contractor",
    value: "8"
  },
  {
    label: "Business Consulting/Services",
    value: "9"
  },
  {
    label: "Construction",
    value: "10"
  },
  {
    label: "Education",
    value: "11"
  },
  {
    label: "Finance/Investments",
    value: "12"
  },
  {
    label: "Fitness/Healthy Lifestlyes",
    value: "13"
  },
  {
    label: "Food & Beverage: Coffee Shop",
    value: "14"
  },
  {
    label: "Food & Bevrage: Confectionary",
    value: "15"
  },
  {
    label: "Food & Bevrage: Fast Food",
    value: "16"
  },
  {
    label: "Food & Bevrage: Fine Dining",
    value: "17"
  },
  {
    label: "Food & Bevrage: Other",
    value: "18"
  },
  {
    label: "Games: Digital",
    value: "19"
  },
  {
    label: "Games: Mobile",
    value: "20"
  },
  {
    label: "Games: Other",
    value: "21"
  },
  {
    label: "Government",
    value: "22"
  },
  {
    label: "Health Care",
    value: "23"
  },
  {
    label: "Health Services/HMOs",
    value: "24"
  },
  {
    label: "Home Business",
    value: "25"
  },
  {
    label: "Hospitality",
    value: "26"
  },
  {
    label: "Insurance",
    value: "27"
  },
  {
    label: "IT: Cloud & Storage",
    value: "28"
  },
  {
    label: "IT: Hardware Repair",
    value: "29"
  },
  {
    label: "IT: Network & Security",
    value: "30"
  },
  {
    label: "IT: Other",
    value: "31"
  },
  {
    label: "IT: Software Development",
    value: "32"
  },
  {
    label: "IT: VoIP Service",
    value: "33"
  },
  {
    label: "Legal Services",
    value: "34"
  },
  {
    label: "Entertainment: Live/Performing Arts",
    value: "35"
  },
  {
    label: "Entertainment: Exhibition",
    value: "36"
  },
  {
    label: "Entertainment: Other",
    value: "37"
  },
  {
    label: "Manufacturing",
    value: "38"
  },
  {
    label: "Medical Products",
    value: "39"
  },
  {
    label: "Music Production",
    value: "40"
  },
  {
    label: "Nonprofit",
    value: "41"
  },
  {
    label: "Oil & Gas",
    value: "42"
  },
  {
    label: "Pharmaceutical",
    value: "44"
  },
  {
    label: "Radio",
    value: "45"
  },
  {
    label: "Real Estate",
    value: "46"
  },
  {
    label: "Real Estate/Housing",
    value: "47"
  },
  {
    label: "Rental & Leasing Services",
    value: "48"
  },
  {
    label: "Retail: Clothing",
    value: "49"
  },
  {
    label: "Retail: Electronics",
    value: "50"
  },
  {
    label: "Retail: Food Stuff & Consumables",
    value: "51"
  },
  {
    label: "Retail: Furniture",
    value: "52"
  },
  {
    label: "Retail: Other",
    value: "53"
  },
  {
    label: "Retail: Sports Equipment",
    value: "54"
  },
  {
    label: "Retail: Wholesale",
    value: "55"
  },
  {
    label: "Sports: Esports",
    value: "56"
  },
  {
    label: "Sports: Motorsports",
    value: "57"
  },
  {
    label: "Sports: Other",
    value: "58"
  },
  {
    label: "Sports: Team Sports",
    value: "59"
  },
  {
    label: "Tech Business",
    value: "60"
  },
  {
    label: "Telecommunications",
    value: "61"
  },
  {
    label: "Travel & Tourism: Airlines",
    value: "62"
  },

  {
    label: "Travel & Tourism: Ride Hailing",
    value: "63"
  },
  {
    label: "Travel & Tourism: Travel Agency",
    value: "64"
  },
  {
    label: "TV Production",
    value: "65"
  },
  {
    label: "Other",
    value: "43"
  }
];

let content = exportLine =>
  `export { default as ${exportLine}  } from "./${exportLine}";\n`;
// let exports = "";
// filenames.forEach((file, i) => {

// });

let d = filenames.map(z => {
  let c = businesses.find(x => fuzz.ratio(z, x.label) > 70);
  if (c) {
    c.icon = `businesIcons.${z}`;
    return c;
  }
});
fs.writeFile("bus.js", JSON.stringify(d), err => console.log("error", err));
// console.log(d);
