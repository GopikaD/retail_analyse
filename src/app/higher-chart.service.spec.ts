import { TestBed, inject } from '@angular/core/testing';

import { HigherChartService } from './higher-chart.service';

describe('HigherChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HigherChartService]
    });
  });

  it('should be created', inject([HigherChartService], (service: HigherChartService) => {
    expect(service).toBeTruthy();
  }));
});
