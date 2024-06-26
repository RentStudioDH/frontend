import React from 'react';
import '../../styles/_hero.scss';
import SectionHome from '../../components/organisms/sections/SectionHome'
import FormSearch from '../../components/organisms/forms/FormSearch'

const Hero = () => {
    return (
        <div className="hero">
            <video className="hero-video" autoPlay muted loop>
                <source src="/camera.webm" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
            </video>
            <div className="hero-content">
                <h1 className="hero-title">¡Hola! ¿Qué estás buscando hoy?</h1>
            <SectionHome  ContainerComponent={FormSearch} containerClass='grid place-items-center' />       
            </div>
        </div>
    );
};

export default Hero;
