import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PartnersSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, rgb(58, 61, 108), rgb(149, 122, 77));
  }
`;

const PartnersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const PartnersTitle = styled.h2`
  font-size: 2.8rem;
  color: rgb(58, 61, 108);
  margin-bottom: 3rem;
  font-weight: bold;
  position: relative;
  display: inline-block;
  padding-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, rgb(58, 61, 108), rgb(149, 122, 77));
    border-radius: 2px;
  }
`;

const PartnersImageWrapper = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PartnersImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const PartnersDescription = styled.p`
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const StrategicPartners: React.FC = () => {
  return (
    <PartnersSection>
      <PartnersContainer>
        <PartnersTitle>شركاؤنا الاستراتيجيون</PartnersTitle>
        <PartnersImageWrapper>
          <PartnersImage
            src="/img/ChatGPT Image May 30, 2025, 02_25_21 AM.png"
            alt="شركاؤنا الاستراتيجيون"
          />
        </PartnersImageWrapper>
        <PartnersDescription>
          نحن فخورون بشراكتنا مع كبرى المؤسسات والشركات العالمية، حيث نسعى دائماً لتقديم أفضل الخدمات والحلول لعملائنا من خلال هذه الشراكات الاستراتيجية
        </PartnersDescription>
      </PartnersContainer>
    </PartnersSection>
  );
};

export default StrategicPartners;
