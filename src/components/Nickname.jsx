import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { handleInputChangeNickName, handleAcceptClick } from '../handlers/clickHandlers';

const Nickname = ({
  dispatch, showNickNameModal, setShowNickNameModal,
}) => {
  const nickName = useSelector((state) => state.game.nickName);
  const [localNickName, setLocalNickName] = useState(nickName);
  const [error, setError] = useState('');

  if (!showNickNameModal) return null;

  return (
    <div className={`overlay ${!showNickNameModal ? 'hidden' : ''}`}>
      <div className="modal">
        <div className="modal-block">
          <div className="nickname">
            <Form>
              <Form.Group>
                <Form.Label>Type your nickname</Form.Label>
                <Form.Control
                  value={localNickName}
                  type="text"
                  className="nickname-value"
                  placeholder="Billie"
                  onChange={(event) => handleInputChangeNickName(event, setLocalNickName)}
                />
                {' '}
                <p style={{ color: 'red' }}>{error}</p>
              </Form.Group>
            </Form>
          </div>
          <Button variant="primary" onClick={() => handleAcceptClick(localNickName, setShowNickNameModal, dispatch, setError)}>Accept</Button>
        </div>
      </div>
    </div>
  );
};

export default Nickname;
