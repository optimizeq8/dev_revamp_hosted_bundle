import PropTypes from "prop-types";
import React from "react";
import { View, ScrollView } from "react-native";
import styles from "./styles";
import Keyword from "./Keyword";

export default KeywordsCarousel = props => {
  let {
    screenProps,
    keywords,
    _renderSideMenu,
    _handleAddKeyword,
    uploading
  } = props;
  const { translate } = screenProps;
  let selectedlist = keywords.map((x, i) => {
    if (i === 0) {
      return (
        <View key={i} style={styles.keywordsColumn}>
          <Keyword
            type={"Edit"}
            _handler={() => {
              _renderSideMenu("keywords");
            }}
            keyword={translate("Edit")}
            uploading={uploading}
          />
          <Keyword
            _handler={_handleAddKeyword}
            keyword={keywords[i]}
            uploading={uploading}
          />
        </View>
      );
    }

    if (i % 2 === 1) {
      return (
        <View key={i} style={styles.keywordsColumn}>
          <Keyword
            _handler={_handleAddKeyword}
            keyword={keywords[i]}
            uploading={uploading}
          />

          {i + 1 !== keywords.length ? (
            <Keyword
              _handler={_handleAddKeyword}
              keyword={keywords[i + 1]}
              uploading={uploading}
            />
          ) : (
            <View />
          )}
        </View>
      );
    }
  });

  return (
    <ScrollView
      style={{ marginVertical: 10 }}
      contentContainerStyle={styles.keywordScrollView}
      horizontal={true}
    >
      {selectedlist}
    </ScrollView>
  );
};

KeywordsCarousel.propTypes = {
  screenProps: PropTypes.object.isRequired,
  keywords: PropTypes.array.isRequired,
  _renderSideMenu: PropTypes.func.isRequired,
  _handleAddKeyword: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};
