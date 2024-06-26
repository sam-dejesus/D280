import { Component, AfterViewInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ApiService } from './api.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'world-map'

  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    const paths = document.getElementsByTagName('path')
    const country_name = document.getElementById('country_name')
    const country_capital = document.getElementById('country_capital')
    const country_region = document.getElementById('country_region')
    const income_level = document.getElementById('income_level')
    const lat = document.getElementById('lat')
    const lon = document.getElementById('lon')

    for (let i = 0; i < paths.length; i++) {
      paths[i].addEventListener('click', () => {
        const pathId = paths[i].id

        this.apiService.getCountryData(pathId).subscribe({
          next: (data) => {
            const countryData = data[1][0]

            if (country_name) country_name.textContent = `Country Name: ${countryData.name}`
            if (country_capital) country_capital.textContent = `Capital: ${countryData.capitalCity}`
            if (country_region) country_region.textContent = `Region: ${countryData.region.value}`
            if (income_level) income_level.textContent = `Income Level: ${countryData.incomeLevel.value}`
            if (lat) lat.textContent = `Latitude: ${countryData.latitude}`
            if (lon) lon.textContent = `Longitude: ${countryData.longitude}`
          },
          error: (err) => {
            console.error('Error:', err)
          }
        })
      })
    }
  }
}
