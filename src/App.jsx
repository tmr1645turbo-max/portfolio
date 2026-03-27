import React from 'react';
import { Layout } from './components/Layout';
import { Top } from './sections/Top';
import { Story } from './sections/Story';
import { Products } from './sections/Products';
import { Diagnosis } from './sections/Diagnosis';
import { Pricing } from './sections/Pricing';
import { Contact } from './sections/Contact';
import ButterflyCursor from './components/ButterflyCursorEffect';

function App() {
  return (
    <>
      <ButterflyCursor />
      <Layout>
        <Top />
        <Story />
        <Products />
        <Diagnosis />
        <Pricing />
        <Contact />
      </Layout>
    </>
  );
}

export default App;
