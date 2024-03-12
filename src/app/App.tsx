import React from 'react';

import { AppRoot, View, Panel, Button, PanelHeader} from '@vkontakte/vkui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Fact from '../pages/fact/ui/Fact';
import Age from '../pages/age/ui/Age';

import './App.css';

import '@vkontakte/vkui/dist/vkui.css';

function App() {

  const [activePanel, setActivePanel] = React.useState('ninja');

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot>
        <View activePanel={activePanel}>
          <Panel id="ninja">
            <PanelHeader after={<Button style={{marginRight: '10px'}} size={'m'} onClick={() => setActivePanel('agify')}>Показать второе задание</Button>}>
              Первое задание.
            </PanelHeader>
            <Fact />
          </Panel>
          <Panel id="agify">
            <PanelHeader after={<Button style={{marginRight: '10px'}} size={'m'} onClick={() => setActivePanel('ninja')}>Показать первое задание</Button>}>
              Второе задание.
            </PanelHeader>
            <Age/>
          </Panel>
        </View>
      </AppRoot>
    </QueryClientProvider>
);
}

export default App;
