
import { Component, Inject, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Material from "@amcharts/amcharts5/themes/Material";

import { ShowProductDatasource } from 'src/app/model/datasource/showproduct.datasource';
import { ProductService } from 'src/app/services/product.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent {

  private root: am5.Root;

  dataSource: ShowProductDatasource;
  fields = ['quantity', 'typeProd', 'description'];

  error = false;

  products: any[] = [];

  constructor(
    private productService: ProductService, private translateService: TranslateService) { }

  ngOnInit() { }


  ngAfterViewInit() {


    this.productService.getData().subscribe((a) => {
      this.products = a;
      
      // Chart code goes in here
      let root = am5.Root.new("chartdiv");

      root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Material.new(root)
      ]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        })
      );

      //Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category"
        })
      );

      // Set data   
      for (let i = 0; i < this.products.length; i++) {
        series.data.push({
          value: this.products[i][0],
          category: this.translateService.instant("table.products.category." + this.products[i][1])
        });
      }

      series.appear(1000, 100);

      this.root = root;

      this.translateService.onLangChange.subscribe((a) => {
        series.data.clear();
        for (let i = 0; i < this.products.length; i++) {
          series.data.push({
            value: this.products[i][0],
            category: this.translateService.instant("table.products.category." + this.products[i][1])
          });
        }
      });
    });


  }

}
