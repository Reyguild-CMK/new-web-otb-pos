import React from 'react';
import { formatRupiah } from "@/lib/currency";
import Barcode from 'react-barcode';

interface SuratPerjanjianProps {
  loanDetails: any;
  pawnItems: any[];
  customerData: any;
}

export function SuratPerjanjian({ loanDetails, pawnItems, customerData }: SuratPerjanjianProps) {
  const customerName = customerData?.name || "-";
  const customerKtp = customerData?.ktpNumber || customerData?.tanda_pengenal || "-";
  const customerAddress = customerData?.address || "-";
  const customerPhone = customerData?.handphone || "-";
  const storeName = "Laku Gadai";

  // Tanggal 
  const txDate = loanDetails?.tanggalTransaksi ? new Date(loanDetails.tanggalTransaksi) : new Date();

  // Format No Dokumen
  const yy = String(txDate.getFullYear()).slice(-2);
  const mm = String(txDate.getMonth() + 1).padStart(2, '0');
  const dd = String(txDate.getDate()).padStart(2, '0');
  const defaultAppNumber = `J2CE34${yy}${mm}${dd}0001`;
  const appNumber = loanDetails?.applicationNumber || defaultAppNumber;

  const txDateStr = txDate.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
  const txDayName = txDate.toLocaleDateString("id-ID", { weekday: 'long' });

  const dueDate = loanDetails?.tanggalJatuhTempo ? new Date(loanDetails.tanggalJatuhTempo) : new Date();
  const dueDateStr = dueDate.toLocaleDateString("id-ID", { day: '2-digit', month: '2-digit', year: 'numeric' });
  const txDateShort = txDate.toLocaleDateString("id-ID", { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Nominal
  const loanNominal = loanDetails?.nilaiPinjaman || 0;
  const storageFee = loanDetails?.biayaPerawatan || 0;

  // Assuming first pawn item is the main one for the seal
  const firstItem = pawnItems && pawnItems.length > 0 ? pawnItems[0] : null;

  const itemNumber = appNumber.startsWith("J2C") ? appNumber.replace(/^J2C[A-Z0-9]{3}/, "ITEM-") : `ITEM-${appNumber}`;

  return (
    <div className="text-black font-sans bg-white p-2 w-full max-w-[21cm] mx-auto text-[10px] leading-relaxed">
      {/* 
        ========================================
        HALAMAN 1: PERJANJIAN JUAL BELI KEMBALI
        ======================================== 
      */}
      <div className="min-h-[29cm]">
        <div className="text-center mb-6 text-[11px]">
          <div className="font-normal">PERJANJIAN JUAL BELI KEMBALI</div>
          <div className="font-normal">ANTARA</div>
          <div className="font-normal">PT. CENTRAL MEGA KENCANA</div>
          <div className="font-normal">DENGAN</div>
          <div className="font-normal">NASABAH</div>
          <div className="font-bold underline mt-1 text-[11px]">NO : {appNumber}</div>
        </div>

        <div className="mb-4 text-justify">
          Pada hari {txDayName} tanggal {txDate.getDate()} bulan {txDate.toLocaleDateString("id-ID", { month: 'long' })} tahun {txDate.getFullYear()}, di {storeName} kami yang bertanda tangan dibawah ini setuju dan sepakat untuk melakukan penjualan barang dengan opsi beli kembali, untuk selanjutnya disebut <b>Perjanjian</b>
        </div>

        <div className="mb-4">
          <table className="w-full text-[10px]">
            <tbody>
              <tr>
                <td width="30" className="align-top" rowSpan={4}>1.</td>
                <td width="130">Nama</td>
                <td>: Nama Petugas</td>
              </tr>
              <tr>
                <td width="130">NIK</td>
                <td>: 99999999</td>
              </tr>
              <tr>
                <td width="130">Nama Store</td>
                <td>: {storeName}</td>
              </tr>
              <tr>
                <td colSpan={2} className="pt-2">Dalam hal ini bertindak sebagai perwakilan dari PT. CENTRAL MEGA KENCANA sebagai <b>Store Manager</b>, selanjutnya disebut sebagai <b>PIHAK PERTAMA</b></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <table className="w-full text-[10px]">
            <tbody>
              <tr>
                <td width="30" className="align-top" rowSpan={4}>2.</td>
                <td width="130">Nama</td>
                <td>: {customerName}</td>
              </tr>
              <tr>
                <td width="130">No. KTP</td>
                <td>: {customerKtp}</td>
              </tr>
              <tr>
                <td width="130">Alamat</td>
                <td>: {customerAddress}</td>
              </tr>
              <tr>
                <td colSpan={2} className="pt-2">hal ini bertindak untuk diri sendiri, selanjutnya disebut sebagai <b>PIHAK KEDUA</b></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4">Dengan ini PIHAK KEDUA bermaksud mengajukan penjualan Perhiasan yang telah dibeli dari PT. CENTRAL MEGA KENCANA berupa :</div>

        <div className="mb-4">
          <table className="w-full text-center border-collapse text-[10px]">
            <thead>
              <tr>
                <th className="border border-black p-1 w-12">No</th>
                <th className="border border-black p-1 w-[40%]">Barang</th>
                <th className="border border-black p-1">Karat/Berat</th>
                <th className="border border-black p-1">Harga</th>
              </tr>
            </thead>
            <tbody>
              {pawnItems && pawnItems.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="border border-black p-1">{index + 1}</td>
                  <td className="border border-black p-1">{item.itemType?.text || item.remark || "Perhiasan"}</td>
                  <td className="border border-black p-1">{item.carat}K / {item.weight}g</td>
                  <td className="border border-black p-1">{formatRupiah(item.appraisal || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4 text-justify">dengan Rincian dan Spesifikasi yang tercantum sesuai dengan invoice pembelian barang serta Foto barang terlampir, yang selanjutnya disebut <b>BARANG</b>.</div>

        <div className="pt-2 text-justify">Selanjutnya PIHAK PERTAMA dan PIHAK KEDUA sepakat dan menyetujui hal-hal berikut ini :</div>
        <div className="mb-4">
          <ol style={{ listStyleType: 'decimal', listStylePosition: 'outside', paddingLeft: '1.25rem' }} className="text-justify space-y-1">
            <li style={{ display: 'list-item' }} className="mb-1">Bahwa PIHAK KEDUA menjual <b>BARANG</b> tersebut adalah benar milik PIHAK KEDUA yang diperoleh secara sah atau legal dan bukan merupakan hasil dari tindak pidana termasuk tidak terbatas Tindak Pidana Pencucian Uang, penggelapan dan bukan merupakan barang sengketa dalam perkara hukum apapun atau harta gono gini dalam perkara perceraian.</li>
            <li style={{ display: 'list-item' }} className="mb-1">Bahwa PIHAK KEDUA telah menjual dan menyerahkan <b>BARANG</b> kepada PIHAK PERTAMA dengan harga {formatRupiah(loanNominal)} selama 4 (empat) bulan terhitung pada tanggal {txDateStr} sampai dengan {dueDateStr}</li>
            <li style={{ display: 'list-item' }} className="mb-1">Setelah 4 (empat) bulan PIHAK KEDUA memiliki hak untuk membeli kembali <b>BARANG</b> yang dijual seharga tersebut diatas.</li>
            <li style={{ display: 'list-item' }} className="mb-1">Bahwa PIHAK PERTAMA wajib untuk menjaga dan merawat Perhiasan yang tercantum dalam Perjanjian ini selama Perjanjian ini berlangsung.</li>
            <li style={{ display: 'list-item' }} className="mb-1">Bahwa PIHAK KEDUA wajib membayar Biaya Perawatan kepada PIHAK PERTAMA sebesar {formatRupiah(storageFee)}</li>
            <li style={{ display: 'list-item' }} className="mb-1">Metode pembayaran Nilai Pembelian Kembali dapat dilakukan dengan menggunakan Transfer Bank atau Gerai Retail.</li>
            <li style={{ display: 'list-item' }} className="mb-1">Bahwa PIHAK KEDUA wajib melakukan konfirmasi kepada PIHAK PERTAMA paling lambat 7 (tujuh) hari sebelum tanggal yang tertera pada point 2 atau memperpanjang jangka waktu 4 bulan periode perjanjian dengan membayar kembali Biaya Perawatan sebesar pada point 5.</li>
            <li style={{ display: 'list-item' }} className="mb-1">Apabila PIHAK KEDUA belum bisa membeli kembali, maka penguasaan <b>BARANG</b> tersebut tetap pada PIHAK PERTAMA.</li>
            <li style={{ display: 'list-item' }} className="mb-1">Apabila sampai dengan tanggal jatuh tempo Perjanjian dan PIHAK KEDUA tidak melakukan pembelian kembali maka <b>BARANG</b> tersebut sepenuhnya akan dijual oleh PIHAK PERTAMA.</li>
            <li style={{ display: 'list-item' }} className="mb-1"><b>BARANG</b> yang telah dijual kepada PIHAK PERTAMA sepenuhnya adalah hak PIHAK PERTAMA untuk mengelola dan menjaga <b>BARANG</b> tersebut dan PIHAK PERTAMA berhak menjual kepada pihak lain atau melakukan peleburan atas <b>BARANG</b> tersebut.</li>
          </ol>
        </div>

        <div className="mb-4">Demikian Perjanjian ini dibuat secara sadar, jujur dan tanpa adanya paksaan dari Pihak manapun juga.</div>

        <table className="w-full text-center break-inside-avoid">
          <tbody>
            <tr>
              <td width="55%" className="align-top text-left">
                <div className="mb-12">PIHAK PERTAMA</div>
                <div>(Nama Petugas)</div>
                <div>PT. CENTRAL MEGA KENCANA</div>
              </td>
              <td className="align-top text-left">
                <div className="mb-2">PIHAK KEDUA</div>
                <div className="h-12 text-xs text-gray-400"><br />Materai 10.000</div>
                <div>({customerName})</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Page break handler */}
      <div className="break-after-page page-break-after-always" style={{ pageBreakAfter: 'always' }}></div>

      {/* 
        ========================================
        HALAMAN 2: SURAT SEGEL
        ======================================== 
      */}
      <div className="mt-8 border-t-2 border-dashed border-gray-800 pt-8">
        <div className="border-2 border-dashed border-gray-800 p-6 mx-auto w-full max-w-[800px] text-[12px]">
          <table className="w-full">
            <tbody>
              <tr>
                <td colSpan={2} className="text-center pb-4">
                  <h1 className="text-3xl font-bold">SURAT SEGEL</h1>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table className="w-full mb-4">
                    <tbody>
                      <tr>
                        <td width="60%"><b>No Dokumen</b> : {appNumber}</td>
                        <td width="40%">
                          <table className="w-full">
                            <tbody>
                              <tr>
                                <td width="130"><b>Kode Cabang/Unit</b></td>
                                <td>: CMK-001</td>
                              </tr>
                              <tr>
                                <td><b>Nama Cabang</b></td>
                                <td>: {storeName}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr><td colSpan={2}><hr className="border-t border-dashed border-gray-600 my-2" /></td></tr>

              <tr>
                <td width="70%" className="align-top pr-4">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td width="30%" className="pb-1">No. CIF</td>
                        <td width="70%" className="font-bold pb-1">: {customerData?.cif || "-"}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Nama</td>
                        <td className="font-bold pb-1">: {customerName}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">No. KTP/SIM</td>
                        <td className="font-bold pb-1">: {customerKtp}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Telp/HP</td>
                        <td className="font-bold pb-1">: {customerPhone}</td>
                      </tr>
                      <tr>
                        <td className="align-top pb-1">Alamat</td>
                        <td className="font-bold align-top pb-1">: {customerAddress}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width="30%" className="align-top border-l border-dashed border-gray-400 pl-4">
                  <div className="mb-4">
                    <div>Tanggal Awal OTB :</div>
                    <div className="text-center font-bold text-base mt-1">{txDateShort}</div>
                    <hr className="border-t border-dashed border-gray-400 mt-2" />
                  </div>
                  <div>
                    <div>Tanggal Pembelian Kembali :</div>
                    <div className="text-center font-bold text-base mt-1">{dueDateStr}</div>
                    <hr className="border-t border-dashed border-gray-400 mt-2" />
                  </div>
                </td>
              </tr>

              <tr><td colSpan={2}><hr className="border-t border-dashed border-gray-600 my-4" /></td></tr>

              <tr>
                <td width="70%" className="align-top pr-4">
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <b className="mb-2 block">Uraian Barang :</b>
                      <p className="whitespace-pre-wrap break-all">{firstItem?.remark || firstItem?.catatan || firstItem?.jenisBarang || "Tidak ada uraian."}</p>
                    </div>
                    <div className="w-[130px] h-[130px] border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-xs text-center overflow-hidden">
                      {firstItem?.photo ? (
                        <img src={firstItem.photo} alt="Foto Barang" className="w-full h-full object-cover" />
                      ) : (
                        "[Foto Barang]"
                      )}
                    </div>
                  </div>
                </td>
                <td width="30%" className="align-top border-l border-dashed border-gray-400 pl-4">
                  <div>
                    <div>Nilai Barang :</div>
                    <div className="text-center font-bold text-base mt-1">{formatRupiah(loanNominal)}</div>
                    <hr className="border-t border-dashed border-gray-400 mt-2" />
                  </div>
                </td>
              </tr>

              <tr><td colSpan={2}><hr className="border-t border-dashed border-gray-600 my-4" /></td></tr>

              <tr>
                <td colSpan={2} className="pt-4">
                  <table className="w-full text-center h-full">
                    <tbody>
                      <tr>
                        <td width="25%" className="align-top pt-2 border-l-4 border-double border-gray-600">
                          <div>QC</div>
                          <div className="h-20"></div>
                          <div className="uppercase">QC CMK</div>
                        </td>
                        <td width="25%" className="align-top pt-2 border-l-4 border-double border-gray-600">
                          <div>Petugas Cabang</div>
                          <div className="h-20"></div>
                          <div className="uppercase">SM CMK</div>
                        </td>
                        <td width="25%" className="align-top pt-2 border-l-4 border-double border-gray-600">
                          <div>Customer</div>
                          <div className="h-20"></div>
                          <div className="uppercase">{customerName}</div>
                        </td>
                        <td width="25%" className="align-middle border-l-4 border-r-4 border-double border-gray-600 p-2">
                          <div className="inline-flex flex-col items-center border border-black bg-white p-2">
                            <Barcode 
                              value={itemNumber} 
                              width={1.2} 
                              height={35} 
                              fontSize={12} 
                              margin={0}
                              displayValue={true}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
