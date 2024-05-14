import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
      sx={{
        color: '#000000', // Color del texto de las pestañas
        '&.Mui-selected': {
          color: '#A62639', // Color del texto de la pestaña seleccionada
        },
        '&.MuiTab-textColorSecondary.Mui-selected': {
          color: '#511C29', // Color del texto de la pestaña seleccionada cuando está en estado hover
        },
        '&.MuiTab-textColorSecondary:hover': {
          color: '#511C29', // Color del texto de la pestaña cuando está en estado hover
        },
        '& .MuiTab-wrapper': {
          borderBottom: '2px solid transparent', // Para eliminar el subrayado por defecto
        },
        '&.Mui-selected .MuiTab-wrapper': {
          borderBottom: '2px solid #511C29', // Color del subrayado cuando la pestaña está seleccionada
        },
      }}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs"
        role="navigation"
        centered
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#A62639', height: "3px" // Color del subrayado cuando se selecciona una pestaña
          },
        }}
      >
        <LinkTab label="Cámaras" href="/#" />
        <LinkTab label="Lentes" href="/#" />
        <LinkTab label="Luces" href="/#" />
        <LinkTab label="Audio" href="/#" />
        <LinkTab label="Profesionales" href="/#" />
      </Tabs>
    </Box>
  );
}
