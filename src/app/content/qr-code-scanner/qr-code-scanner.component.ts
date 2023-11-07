import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css']
})
export class QrCodeScannerComponent implements OnInit {
  BarcodeFormat = BarcodeFormat; // Make BarcodeFormat available in template
  loadingCamera = true; // Variable to control camera loading

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      // Se não existe um token, redirecione para a página de login
      this.router.navigate(['/login']);
    }

    // Simulando o evento ou momento em que a câmera está pronta
    setTimeout(() => {
      this.loadingCamera = false; // Atualize a variável quando a câmera estiver pronta
    }, 1500); // Tempo de espera simulado de 2 segundos, substitua com o evento ou momento correto da biblioteca
  }

  handleQrCodeResult(resultString: string) {

    const route = resultString.replace('https://www.frst.com.br', '');

    // Realize o redirecionamento
    this.router.navigateByUrl(route);
  }

  goBack() {
    this.router.navigate(['/content']);
  }
}
