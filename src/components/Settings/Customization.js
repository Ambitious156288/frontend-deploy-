import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import styled from 'styled-components'

const StyledCenter = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function DynamicCSS(
    {
        noteVariable,
        noteSettings,
        photoVariable,
        photoSettings,
        filesVariable,
        filesSettings,
        metadataVariable,
        metadataSettings
    }) {
    return (
        <React.Fragment>
            <StyledCenter>
                <FormControlLabel
                    control={
                        <Switch
                            checked={noteVariable}
                            onChange={noteSettings}
                            color="primary"
                            value="dynamic-class-name"
                        />
                    }
                    label="Notes"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={photoVariable}
                            onChange={photoSettings}
                            color="primary"
                            value="dynamic-class-name"
                        />
                    }
                    label="Photo Gallery"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={filesVariable}
                            onChange={filesSettings}
                            color="primary"
                            value="dynamic-class-name"
                        />
                    }
                    label="Various Files"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={metadataVariable}
                            onChange={metadataSettings}
                            color="primary"
                            value="dynamic-class-name"
                        />
                    }
                    label="Get Metadata"
                />



            </StyledCenter>
        </React.Fragment>
    );
}
