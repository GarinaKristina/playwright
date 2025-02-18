import { faker } from '@faker-js/faker'

export default class UniqueData {
  /**
   * Generates a unique first name
   *
   * @example
   * UniqueData.uniqueFirstName // 'Antwan'
   * @returns {string} A unique first name
   */
  public static get firstName(): string {
    return faker.person.firstName()
  }

  /**
   * Generates a unique last name
   *
   * @example
   * UniqueData.uniqueLastName // 'Barton'
   * @returns {string} A unique last name
   */
  public static get lastName(): string {
    return faker.person.lastName()
  }

  /**
   * Generates a unique int number in range from 1000000000 to 9999999999
   *
   * @example
   * UniqueData.randomNumber // 1562148912
   * @returns {string} A unique number
   */
  public static get zipCode(): string {
    return String(faker.number.int({ min: 1000, max: 5000 }))
  }
}
