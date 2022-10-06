import React from 'react';
import { Document, Image, Page, StyleSheet, View } from '@react-pdf/renderer';
import { UTLogoBlack } from '../../../../../assets/imgs';
import { BasePath } from '../../../../../common/constants';

const s = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: 100,
    height: 30,
  },
  headerInfo: {

  }
});

export const WoPdf = () => (
  <Document>
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Image style={s.logo} src={`${BasePath + UTLogoBlack}`} />
        <View>

        </View>

      </View>
    </Page>
  </Document>
);