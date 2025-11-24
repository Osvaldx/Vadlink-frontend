import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../../services/stats-service';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnInit {

  private authorsChart?: Chart;
  private commentsTotalChart?: Chart;
  private commentsPerPostChart?: Chart;

  private postsTimelineChart?: Chart;
  private commentsTimelineChart?: Chart;
  private postsLikesChart?: Chart;

  private daysRange = 30;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    Chart.register(...registerables);
    this.reloadCharts();
  }

  onRangeChange(event: any) {
    this.daysRange = Number(event.target.value);
    this.reloadCharts();
  }

  private reloadCharts() {
    const { from, to } = this.buildRange(this.daysRange);

    this.loadAuthorsChart(from, to);
    this.loadCommentsTotalChart(from, to);
    this.loadCommentsPerPostChart(from, to);

    this.loadPostsTimelineChart(from, to);
    this.loadCommentsTimelineChart(from, to);
    this.loadPostsLikesChart(from, to);
  }

  private buildRange(days: number) {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - days);

    return {
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    };
  }

  private destroy(chart?: Chart) {
    if (chart) chart.destroy();
  }

  // AUTORES MÁS ACTIVOS (Posts por usuario — Doughnut)
  private loadAuthorsChart(from: string, to: string) {
    this.statsService.getUsersPostsStats(from, to).subscribe(res => {

      this.destroy(this.authorsChart);

      this.authorsChart = new Chart('authorsChart', {
        type: 'doughnut',
        data: {
          labels: res.data.map(u => u.username),
          datasets: [{
            data: res.data.map(u => u.postsCount),
            backgroundColor: [
              '#3b82f6', '#6366f1', '#8b5cf6',
              '#ec4899', '#f43f5e', '#f59e0b'
            ]
          }]
        },
        options: {
          cutout: '60%'
        }
      });
    });
  }

  // COMENTARIOS TOTALES (Mini bar)
  private loadCommentsTotalChart(from: string, to: string) {
    this.statsService.getCommentsStats(from, to).subscribe(res => {

      this.destroy(this.commentsTotalChart);

      this.commentsTotalChart = new Chart('commentsTotalChart', {
        type: 'bar',
        data: {
          labels: ['Comentarios'],
          datasets: [{
            label: 'Comentarios',
            data: [res.totalComments],
            backgroundColor: '#4ade80'
          }]
        },
        options: {
          responsive: false
        }
      });
    });
  }

  // COMENTARIOS POR PUBLICACIÓN (Bar horizontal)
  private loadCommentsPerPostChart(from: string, to: string) {
    this.statsService.getPostsCommentsStats(from, to).subscribe(res => {

      this.destroy(this.commentsPerPostChart);

      this.commentsPerPostChart = new Chart('commentsPerPostChart', {
        type: 'bar',
        data: {
          labels: res.data.map(p => p.title.substring(0, 20) + '…'),
          datasets: [{
            label: 'Comentarios',
            data: res.data.map(p => p.commentsCount),
            backgroundColor: '#f59e0b'
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: false
        }
      });

    });
  }

  // POSTS EN EL TIEMPO (Line Chart)
  private loadPostsTimelineChart(from: string, to: string) {
    this.statsService.getPostsTimeline(from, to).subscribe(res => {

      this.destroy(this.postsTimelineChart);

      this.postsTimelineChart = new Chart('postsTimelineChart', {
        type: 'line',
        data: {
          labels: res.data.map(d => d.date),
          datasets: [{
            label: 'Posts',
            data: res.data.map(d => d.count),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.3)',
            fill: true,
            tension: 0.3,
            pointRadius: 3
          }]
        },
        options: { responsive: false }
      });

    });
  }

  // COMENTARIOS EN EL TIEMPO (Line Chart)
  private loadCommentsTimelineChart(from: string, to: string) {
    this.statsService.getCommentsTimeline(from, to).subscribe(res => {

      this.destroy(this.commentsTimelineChart);

      this.commentsTimelineChart = new Chart('commentsTimelineChart', {
        type: 'line',
        data: {
          labels: res.data.map(d => d.date),
          datasets: [{
            label: 'Comentarios',
            data: res.data.map(d => d.count),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.3)',
            fill: true,
            tension: 0.3,
            pointRadius: 3
          }]
        },
        options: { responsive: false }
      });

    });
  }

  // POSTS CON MÁS LIKES (Radar Chart)
  private loadPostsLikesChart(from: string, to: string) {
    this.statsService.getPostsLikes(from, to).subscribe(res => {

      this.destroy(this.postsLikesChart);

      this.postsLikesChart = new Chart('postsLikesChart', {
        type: 'radar',
        data: {
          labels: res.data.map(p => p.title.substring(0, 20) + '…'),
          datasets: [{
            label: 'Likes',
            data: res.data.map(p => p.likes),
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139,92,246,0.3)',
            pointRadius: 3
          }]
        },
        options: { }
      });

    });
  }
}