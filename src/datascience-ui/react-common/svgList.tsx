// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import * as React from 'react';
import { SvgLoader } from 'react-svgmt';
import { getLocString } from '../react-common/locReactSide';

import './svgList.css';

interface ISvgListProps {
    images: string[];
    currentImage: number;
    imageClicked(index: number): void;
}

export class SvgList extends React.Component<ISvgListProps> {
    constructor(props: ISvgListProps) {
        super(props);
    }

    public render() {
        return (
            <div className='svg-list-container'>
                <div className='svg-list'>
                {this.renderImages()}
                </div>
            </div>
        );
    }

    private renderImages() {
        return this.props.images.map((image, index) => {
            const className = index === this.props.currentImage ? 'svg-list-item svg-list-item-selected' : 'svg-list-item';
            const ariaLabel = index === this.props.currentImage ? getLocString('DataScience.selectedImageListLabel', 'Selected Image') : getLocString('DataScience.selectedImageLabel', 'Image');
            const ariaPressed =  index === this.props.currentImage ? 'true' : 'false';
            const clickHandler = () => this.props.imageClicked(index);
            const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => this.onKeyDown(e, index);
            return (
                // See the comments here: https://github.com/Microsoft/tslint-microsoft-contrib/issues/676
                // tslint:disable-next-line: react-this-binding-issue
                <div className={className} tabIndex={0} role='button' aria-label={ariaLabel} aria-pressed={ariaPressed} onClick={clickHandler} onKeyDown={keyDownHandler} key={index}>
                    <div className='svg-list-item-image'>
                        <SvgLoader svgXML={image}>
                        </SvgLoader>
                    </div>
                </div>
            );
        });
    }

    private onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
        // Enter and Space commit an action the same as a click does
        if (event.key === 'Enter' || event.key === ' ') {
            this.props.imageClicked(index);
        }
    }
}
