import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheService } from '../service/cache.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class InputComponent implements OnInit, OnDestroy {

  searchInput = new FormControl();

  constructor(private cacheService: CacheService) {
  }

  ngOnInit(): void {

    // Debounce user input with a 300ms delay
    this.searchInput.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((searchText: string) => {
      this.cacheService.updatePrefix(searchText);
    });
  }

  ngOnDestroy(): void {
    this.cacheService.prefixUnsubscribe();
  }

}
