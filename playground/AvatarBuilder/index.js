import React from 'react';
import { Button, Image, Modal, Header } from 'semantic-ui-react';
import AvatarBuilder from './AvatarBuilder';
const AvatarModal = () => (
  <Modal
    trigger={<Button>Show Modal</Button>}
    closeOnRootNodeClick={false}
  >
    <Modal.Header>Build a custom BetterHue Avatar</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>BetterHue Avatar Builder</Header>
        <AvatarBuilder />
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default AvatarModal;
