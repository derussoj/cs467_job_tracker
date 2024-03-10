import React from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

function FloatingActionButton({ onClick }) {
    return (
        <Button
            onClick={onClick}
            aria-label="Create new"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '56px',
                height: '56px',
                zIndex: 1000,
                boxShadow: '0px 4px 8px 2px rgba(0, 0, 0, 0.2)',
            }}
            variant="primary"
            className="rounded-circle"
        >
            <Plus size={24} />
        </Button>
    );
}

export default FloatingActionButton;
