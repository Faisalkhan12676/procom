import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

//c42c9c6adc7246b0906fdb6954d39987

const DATA = [
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Frederic Lardinois",
    title:
      "Microsoft makes it easier to integrate quantum and classical computing",
    description:
      "By default, every quantum computer is going to be a hybrid that combines quantum and classical compute. Microsoft estimates that a quantum computer that will be able to help solve some of the world’s most pressing questions will require at least a million sta…",
    url: "https://techcrunch.com/2023/03/08/microsoft-makes-it-easier-to-integrate-quantum-and-classical-computing/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2023/01/GettyImages-1393513219.jpg?resize=1200,568",
    publishedAt: "2023-03-08T17:31:05Z",
    content:
      "By default, every quantum computer is going to be a hybrid that combines quantum and classical compute. Microsoft estimates that a quantum computer that will be able to help solve some of the world’s… [+3513 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Alex Wilhelm",
    title: "The sky isn't falling for cloud software spend",
    description:
      "New data from Battery Ventures helps those building software startups orient themselves to the present day.",
    url: "https://techcrunch.com/2023/03/08/the-sky-isnt-falling-for-cloud-software-spend/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2020/05/NSussman_Techcrunch_Exchange_v3_RD.jpg?resize=1200,900",
    publishedAt: "2023-03-08T16:49:03Z",
    content:
      "If you read the startup press, you might think that everyone in tech is still nursing a stiff hangover from the zenith of the 2021 boom. While there is much talk of cutting spending, conserving capit… [+1736 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Ram Iyer",
    title:
      "Dear Sophie: Last-minute H-1Bs, O-1A & EB-1A extraordinary credential prep",
    description:
      "How many people are employers going to register in the H-1B lottery this year? Will there be fewer because of all of the layoffs?",
    url: "https://techcrunch.com/2023/03/08/dear-sophie-last-minute-h-1bs-o-1a-eb-1a-extraordinary-credential-prep/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2021/01/dear-sophie-immigration-maze-3.jpg?resize=1200,675",
    publishedAt: "2023-03-08T16:00:30Z",
    content:
      "More posts by this contributor\r\nHere’s another edition of “Dear Sophie,” the advice column that answers immigration-related questions about working at technology companies.\r\n“Your questions are vital… [+2025 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Kirsten Korosec",
    title:
      "Tesla under investigation after steering wheels fall off two Model Y vehicles",
    description:
      "Federal safety regulators are looking into Tesla again — this time over concerns of steering wheels falling off 2023 Model Y vehicles.",
    url: "https://techcrunch.com/2023/03/08/tesla-under-investigation-after-steering-wheels-fall-off-two-model-y-vehicles/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2022/12/Screen-Shot-2022-12-09-at-2.05.43-PM.jpg?resize=1200,654",
    publishedAt: "2023-03-08T15:58:21Z",
    content:
      "Federal safety regulators are looking into Tesla again this time over concerns of steering wheels falling off 2023 Model Y vehicles.\r\nThe National Highway Traffic Safety Administration said Wednesday… [+1783 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Aisha Malik",
    title:
      "Elon Musk apologizes after publicly mocking Twitter employee with disability",
    description:
      "Elon Musk has apologized after publicly mocking a disabled Twitter employee who was uncertain if he had been laid off.",
    url: "https://techcrunch.com/2023/03/08/elon-musk-apologizes-after-publicly-mocking-twitter-employee-with-disability/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2022/08/GettyImages-1240311179-e1662576449255.jpg?resize=1200,675",
    publishedAt: "2023-03-08T15:00:36Z",
    content:
      "Elon Musk has apologized after publicly mocking a Twitter employee with a disability who was uncertain if he had been laid off by the social media company. Musk questioned the work performance of the… [+3725 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Frederic Lardinois",
    title: "Vantage raises $21M Series A to help bring down cloud costs",
    description:
      "Vantage, a startup that helps businesses optimize their cloud spent, today announced a $21 million Series A funding round.",
    url: "https://techcrunch.com/2023/03/08/vantage-raises-21m-series-a-to-help-bring-down-cloud-costs/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-200479390-001.jpg?resize=1200,800",
    publishedAt: "2023-03-08T01:03:05Z",
    content:
      "Vantage, a startup that helps businesses better understand their cloud infrastructure spend (and automate their savings), today announced that it has raised a $21 million Series A funding round led b… [+3954 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Lauren Simonds",
    title: "Yikes! 72 hours left to save $1K on passes to Disrupt",
    description:
      "The countdown to the biggest savings continues. Just 72 hours left to shave $1,000 off the price of your pass to TechCrunch Disrupt 2023!",
    url: "https://techcrunch.com/2023/03/08/72-hours-left-save-a-thousand-dollars-techcrunch-disrupt-2023/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2023/03/Countdown-Article-Image-Header_3-days_1920x1080.jpg?resize=1200,675",
    publishedAt: "2023-03-07T23:59:16Z",
    content:
      "Downshift into get er done gear, and you can save a hefty $1,000. How? Simply take decisive action and buy your pass to TechCrunch Disruptbefore Friday, March 10 at 11:59 p.m. PST. We can think of a … [+2099 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Aria Alamalhodaei",
    title:
      "Starfish Space captures new funding ahead of orbital servicing demo mission",
    description:
      "Starfish Space closed a new round of funding ahead of its orbital servicing demonstration mission this summer.",
    url: "https://techcrunch.com/2023/03/08/starfish-space-captures-new-funding-ahead-of-orbital-servicing-demo-mission/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2023/03/Otter_On-Orbit.png?resize=1200,675",
    publishedAt: "2023-03-07T23:56:47Z",
    content:
      "In the present moment, if a critical component on a satellite malfunctions or it runs out of fuel, satellite operators have no choice but to consider that asset caput.\r\nStarfish Space is one of a han… [+3107 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Kyle Wiggers",
    title:
      "Humane, a secretive AI startup founded by ex-Apple employees, raises another $100M",
    description:
      "Humane, a secretive startup co-founded by ex-Apple employees, has raised $100 million in a fresh venture round.",
    url: "https://techcrunch.com/2023/03/08/humane-the-secretive-ai-startup-founded-by-ex-apple-employees-raises-another-100m/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2022/01/GettyImages-1314979456.jpg?resize=1200,675",
    publishedAt: "2023-03-07T23:29:47Z",
    content:
      "A startup founded by ex-Apple design and engineering team Imran Chaudhri and Bethany Bongiorno, Humane, today raised another $100 million to build what it calls an “integrated device and cloud servic… [+6003 chars]",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Aisha Malik",
    title:
      "Google expands VPN access to all Google One members, rolls out new 'dark web report' feature",
    description:
      "Google is expanding VPN access to all Google One members on all plans and rolling out a new dark web report feature for all subscribers.",
    url: "https://techcrunch.com/2023/03/08/google-expands-vpn-access-to-all-google-one-members-rolls-out-new-dark-web-report-feature/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2023/03/Screenshot-2023-03-07-at-4.01.43-PM.png?resize=1200,614",
    publishedAt: "2023-03-07T21:07:59Z",
    content:
      "Google is expanding VPN access to all Google One members on all plans and rolling out a new dark web report feature for all subscribers. VPN by Google One was previously only available to members on … [+2183 chars]",
  },
];

const API_KEY = "c42c9c6adc7246b0906fdb6954d39987";
const BASE_URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((response) => {
        const { articles } = response.data;
        setNews(articles);
      })
      .catch((error) => {
        console.log(error);
        setNews(DATA);
      });
  }, []);

  const handleNavigate = (link) => {
    Linking.openURL(link);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigate(item.url)}
        activeOpacity={0.5}
      >
        <ImageBackground
          style={styles.container}
          source={{ uri: item.urlToImage }}
          resizeMode="cover"
        >
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.svf}>
      <View>
        <Text
          style={{
            fontSize: 20,
            marginVertical: 10,
            fontWeight: "bold",
          }}
        >
          Today's News
        </Text>
      </View>
      <FlatList
        data={news}
        keyExtractor={(e) => e.publishedAt}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  svf: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  container: {
    height: 150,
    width: Dimensions.get("screen").width / 1.2,
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginHorizontal: 2,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontVariant: "900",
    color: "#fff",
    position: "absolute",
    bottom: 5,
    marginHorizontal: 10,
  },
});
