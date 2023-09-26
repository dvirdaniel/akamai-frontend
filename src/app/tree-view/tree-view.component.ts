import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CacheService } from '../service/cache.service';
import { FileModel } from '../model/file-model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatListModule, CommonModule, MatTooltipModule],
})
export class TreeViewComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<FileModel>((node) => node.directories);
  dataSource = new MatTreeNestedDataSource<FileModel>();
  private dataSubscription: Subscription | undefined;

  constructor(private cacheService: CacheService) {
  }

  ngOnInit(): void {
    this.cacheService.clearCache();
    this.dataSubscription = this.cacheService.getData().subscribe( (data: FileModel[]) => this.dataSource.data = data);
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  hasName = (_: number, node: FileModel) => !!node.name;
  hasFiles = (_: number, node: FileModel) => !!node.files && node.files.length > 0;
  hasDirectories = (_: number, node: FileModel) => !!node.directories && node.directories.length > 0;
}
