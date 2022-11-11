import React, { useCallback, useEffect, useState } from 'react';
import { Box, Center, Container, Heading, Stack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';

import { getCountries, getCountryPublicHolidays } from '../../providers/countries';
import { LANG } from '../../lang/pt-br';
import { CURRENT_YEAR } from '../../constants';

function Home() {
  const [countries, setCountries] = useState([]);
  const [holidays, setHolidays] = useState([]);

  const showCountries = useCallback(async () => {
    const countriesFound = await getCountries();

    setCountries(countriesFound);
  }, []);

  useEffect(() => {
    showCountries();
  }, []); 
  // Não removi esse warning porque quero 
  //que carregue apenas uma vez ao carregar a pg.

  const showHolidays = useCallback(async (year, countryCode) => {
    const holidaysFound = await getCountryPublicHolidays(year, countryCode);

    setHolidays(holidaysFound);
  }, []);

  const getSelectedCountry = (e) => {
    showHolidays(CURRENT_YEAR, e.currentTarget.value);
  }

  return (
    <Container maxW={'xl'}>
      <Box minH="100vh">
        {/* Title and decription */}
        <Center>
          <Stack direction={'column'} textAlign="center">
            <Heading>{LANG.COUNTRY_SELECTOR}</Heading>
            <Text>{LANG.COUNTRY_SELECTOR_SUB}</Text>
          </Stack>
        </Center>

        {/* Country Selection */}
        <Stack mt={6}>
          <Select placeholder={LANG.SELECT_COUNTRY} onChange={getSelectedCountry}>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>
                {country.name}
              </option>
            ))}
          </Select>
        </Stack>

        {/* Current Holidays on display */}
        {/* 
          *
          *
          TODO: criar um array de meses (de 1 a 12 - meses do ano - e seu nome em outra chave) 
          TODO: fazer o loop nesses meses com o map de holidays, e se eles estivessem
          dentro daquele mês, usando a funcão new Date().getMonth no atributo date vindo da API,
          popular aquela coluna com o nome da chave de meses, e cada feriado que encontrasse

          const months = [ { id: 1, name: 'January' } ...] - loop aqui, filter no array de holidays
          para executar a descrição acima
        */}

        <Stack mt={6}>
          {holidays.map(holiday => (
            <Box bgColor={'gray.300'}>
              <Stack direction={"column"}>
                <Center>
                  <Text>{`${holiday.date} ${holiday.localName}`}</Text>
                </Center>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  )
}

export default Home;
