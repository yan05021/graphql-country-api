import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import { AppDataSource } from "../ormconfig";

const countryRepository = AppDataSource.getRepository(Country);

@Resolver(Country)
export class CountryResolver {
  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode") continentCode: string
  ): Promise<Country> {
    const country = countryRepository.create({
      code,
      name,
      emoji,
      continentCode,
    });
    return await countryRepository.save(country);
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await countryRepository.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return await countryRepository.findOneBy({ code });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    return await countryRepository.findBy({ continentCode });
  }
}
