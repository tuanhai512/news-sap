import { FunctionalScenario } from '../types/functional.ts';

export const SAP_FUNCTIONAL_SCENARIOS: FunctionalScenario[] = [
  {
    id: 'sd-o2c-bd9',
    module: 'SD',
    scopeItemCode: 'BD9',
    titleVi: 'Quy trình Bán hàng từ Tồn kho (Sell from Stock - Order-to-Cash)',
    titleEn: 'Order-to-Cash with Automated Electronic Invoice & AR Reconciliation',
    businessContextVi: 'Khách hàng đặt mua 500 thùng sữa tiệt trùng từ kho trung tâm. Quy trình tự động kiểm tra hạn mức tín dụng (Credit Limit), giữ tồn kho (ATP check), xuất kho, phát hành Hóa đơn điện tử theo chuẩn Tổng Cục Thuế Việt Nam và đối soát thanh toán.',
    businessBenefitVi: 'Tự động hóa 100% việc kiểm tra công nợ và khóa giao dịch rủi ro; giảm 80% thời gian xuất hóa đơn điện tử; đồng bộ số liệu doanh thu tức thì sang Sổ Cái Kế toán.',
    targetIndustries: ['Bán lẻ & FMCG', 'Sản xuất hàng tiêu dùng', 'Thương mại phân phối'],
    steps: [
      {
        stepNumber: 1,
        stepName: 'Tạo Đơn Đặt Hàng Bán (Create Sales Order)',
        role: 'Nhân viên Kinh doanh / Sales Admin',
        fioriApp: 'Manage Sales Orders (Fiori F3893)',
        tCode: 'VA01',
        descriptionVi: 'Hệ thống tự động tra cứu bảng giá theo cấp đại lý (Pricing Procedure), tính toán chiết khấu thương mại và kiểm tra tồn kho khả dụng (Available-to-Promise ATP).',
        documentGenerated: 'Số chứng từ SO: #4500018920 (Loại đơn hàng: OR)',
        jouleAiAssistantRole: 'Joule AI tự động phân tích lịch sử thanh toán của khách hàng, cảnh báo nợ quá hạn và đề xuất hạn mức tín dụng tối ưu.',
        sampleData: [
          { label: 'Khách hàng (Sold-to Party)', value: 'Công ty Cổ phần Bán lẻ VinCommerce (Mã SAP: 100085)' },
          { label: 'Mặt hàng (Material)', value: 'MILK-UHT-1L (Thùng sữa 1L tiệt trùng - 12 hộp)' },
          { label: 'Số lượng đặt', value: '500 Thùng' },
          { label: 'Đơn giá & Thuế GTGT', value: '320,000 VND / thùng (Thuế VAT 8%)' },
          { label: 'Tổng giá trị đơn hàng', value: '172,800,000 VND (Đã gồm VAT)' }
        ]
      },
      {
        stepNumber: 2,
        stepName: 'Tạo Lệnh Giao Hàng & Xuất Kho (Outbound Delivery & PGI)',
        role: 'Thủ kho & Nhân viên Giao vận (Logistics)',
        fioriApp: 'Create Outbound Deliveries (Fiori F0868)',
        tCode: 'VL01N / VL02N (Goods Issue)',
        descriptionVi: 'Xuất lệnh nhặt hàng (Picking) tại kho trung tâm, đóng gói và ghi nhận Xuất kho thực tế (Post Goods Issue - PGI) với Movement Type 601.',
        documentGenerated: 'Phiếu xuất kho Outbound Delivery: #80003412 và Chứng từ vật tư: #4900081290',
        jouleAiAssistantRole: 'Joule gợi ý vị trí ô kệ (Storage Bin) gần cửa xuất hàng nhất và lộ trình gom đơn ngắn nhất trong kho.',
        accountingPostings: [
          {
            accountNumber: '632000 (Giá vốn hàng bán - COGS)',
            accountName: 'Cost of Goods Sold',
            debitCredit: 'Nợ (Debit)',
            amount: '125,000,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '156100 (Hàng hóa tồn kho)',
            accountName: 'Merchandise Inventory',
            debitCredit: 'Có (Credit)',
            amount: '125,000,000 VND',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Mã vận đơn giao hàng', value: 'DLV-2026-03-882' },
          { label: 'Movement Type', value: '601 (GD goods issue: delivery)' },
          { label: 'Kho xuất hàng (Plant / Storage Loc)', value: 'Nhà máy Bình Dương (Plant 1010 / SLOC 0001)' }
        ]
      },
      {
        stepNumber: 3,
        stepName: 'Lập Hóa Đơn Bán Hàng & Hóa Đơn Điện Tử (Billing Document & E-Invoice)',
        role: 'Kế toán Bán hàng / AR Accountant',
        fioriApp: 'Create Billing Documents (Fiori F0798)',
        tCode: 'VF01 / VF04',
        descriptionVi: 'Tạo chứng từ Billing tự động ghi nhận doanh thu và tích hợp cổng Hóa đơn điện tử (E-Invoice Viettel/VNPT) cấp mã CQT.',
        documentGenerated: 'Hóa đơn bán hàng SAP Billing: #900012450 (Số HĐĐT: 1C26TTH/001289)',
        jouleAiAssistantRole: 'Joule tự động đối chiếu thông tin mã số thuế và áp dụng đúng thuế suất giảm thuế GTGT theo Nghị định hiện hành.',
        accountingPostings: [
          {
            accountNumber: '131100 (Phải thu khách hàng - Trade AR)',
            accountName: 'Accounts Receivable Customer',
            debitCredit: 'Nợ (Debit)',
            amount: '172,800,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '511100 (Doanh thu bán hàng - Revenue)',
            accountName: 'Sales Revenue',
            debitCredit: 'Có (Credit)',
            amount: '160,000,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '333110 (Thuế GTGT đầu ra phải nộp)',
            accountName: 'Output VAT 8%',
            debitCredit: 'Có (Credit)',
            amount: '12,800,000 VND',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Điều khoản thanh toán', value: 'NET 30 (Thanh toán trong vòng 30 ngày)' },
          { label: 'Ký số điện tử HSM', value: 'Đã ký số và gửi email hóa đơn tự động cho đại lý' }
        ]
      },
      {
        stepNumber: 4,
        stepName: 'Thu Tiền & Xóa Sổ Công Nợ (Incoming Payment & Clearing)',
        role: 'Kế toán Ngân hàng / Cashier',
        fioriApp: 'Post Incoming Payments (Fiori F1345)',
        tCode: 'F-28 / FEBAN',
        descriptionVi: 'Nhận báo có từ tài khoản ngân hàng điện tử (Host-to-Host Vietcombank), hệ thống tự động tìm đúng hóa đơn bán hàng và xóa sổ công nợ.',
        documentGenerated: 'Chứng từ kế toán thanh toán: #1400000892',
        jouleAiAssistantRole: 'Joule tự động quét nội dung chuyển khoản "TT HD 001289 VinCommerce" để gán đúng mã khách và hóa đơn cần tất toán với độ chính xác 99%.',
        accountingPostings: [
          {
            accountNumber: '112100 (Tiền gửi ngân hàng - VCB)',
            accountName: 'Bank Deposit Vietcombank',
            debitCredit: 'Nợ (Debit)',
            amount: '172,800,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '131100 (Phải thu khách hàng)',
            accountName: 'Accounts Receivable Customer Cleared',
            debitCredit: 'Có (Credit)',
            amount: '172,800,000 VND',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Trạng thái công nợ', value: 'Đã tất toán (Cleared) - Dư nợ bằng 0' },
          { label: 'Hạn mức tín dụng khách hàng', value: 'Được phục hồi hạn mức khả dụng 172.8 triệu VND' }
        ]
      }
    ]
  },
  {
    id: 'mm-p2p-j45',
    module: 'MM',
    scopeItemCode: 'J45',
    titleVi: 'Quy trình Mua sắm & Kiểm định Hàng hóa (Procure-to-Pay)',
    titleEn: 'Procure-to-Pay with 3-Way Matching & Quality Inspection',
    businessContextVi: 'Nhà máy cần mua 20 tấn hạt nhựa nguyên sinh PP phục vụ sản xuất bao bì. Quy trình đi từ Yêu cầu mua hàng (PR), Đơn đặt hàng mua (PO), Nhập kho có kiểm định chất lượng (QM) và Đối chiếu hóa đơn 3 bên (3-Way Matching).',
    businessBenefitVi: 'Ngăn chặn 100% gian lận mua sắm bằng cơ chế đối chiếu 3 chiều (PO vs Phiếu cân nhập kho vs Hóa đơn nhà cung cấp); kiểm soát nghiêm ngặt định mức giá mua nguyên vật liệu.',
    targetIndustries: ['Sản xuất bao bì', 'Hóa chất & Dược phẩm', 'Công nghiệp nặng'],
    steps: [
      {
        stepNumber: 1,
        stepName: 'Tạo & Phê duyệt Đơn Đặt Hàng Mua (Purchase Order Approval)',
        role: 'Trưởng phòng Mua hàng / Procurement Manager',
        fioriApp: 'Manage Purchase Orders (Fiori F0842A)',
        tCode: 'ME21N / ME28',
        descriptionVi: 'Hệ thống chuyển Yêu cầu mua hàng (PR) thành PO chính thức theo hợp đồng khung đã ký, kích hoạt quy trình phê duyệt đa cấp theo hạn mức.',
        documentGenerated: 'Số chứng từ PO: #4500098120',
        jouleAiAssistantRole: 'Joule AI so sánh biến động giá hạt nhựa trên sàn hàng hóa quốc tế và đề xuất đợt nhập hàng có giá chiết khấu tốt nhất.',
        sampleData: [
          { label: 'Nhà cung cấp (Vendor)', value: 'Tổng Công ty Hóa dầu Petrolimex (Mã SAP: 200054)' },
          { label: 'Vật tư mua sắm', value: 'POLYPROPYLENE-RESIN-GRADE-A (Hạt nhựa PP)' },
          { label: 'Khối lượng & Đơn giá', value: '20,000 KG x 32,500 VND/KG' },
          { label: 'Tổng giá trị PO', value: '650,000,000 VND (Chưa VAT)' }
        ]
      },
      {
        stepNumber: 2,
        stepName: 'Nhập Kho & Kiểm Định Chất Lượng (Goods Receipt & QM)',
        role: 'Thủ kho & Kỹ sư KCS/QC',
        fioriApp: 'Post Goods Receipt for Purchasing Document (Fiori F1077)',
        tCode: 'MIGO (Movement Type 101/103)',
        descriptionVi: 'Cân xe tải tại cổng, quét mã vạch lô hàng và đưa vào kho kiểm định chất lượng (Quality Inspection Stock). Khi QC đạt chuẩn, hệ thống tự động giải phóng sang kho khả dụng (Unrestricted-use Stock).',
        documentGenerated: 'Phiếu nhập kho GR: #5000045210 và Phiếu kiểm định chất lượng: #1000034',
        jouleAiAssistantRole: 'Joule tự động đọc biên bản phân tích COA (Certificate of Analysis) từ file PDF của nhà cung cấp và đối chiếu với tiêu chuẩn độ ẩm.',
        accountingPostings: [
          {
            accountNumber: '152100 (Nguyên vật liệu chính tồn kho)',
            accountName: 'Raw Materials Inventory',
            debitCredit: 'Nợ (Debit)',
            amount: '650,000,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '338800 (Tài khoản trung gian GR/IR Clearing)',
            accountName: 'Goods Receipt / Invoice Receipt Clearing',
            debitCredit: 'Có (Credit)',
            amount: '650,000,000 VND',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Quản lý theo Lô (Batch Management)', value: 'Số Lô: BATCH-2026-03-A9' },
          { label: 'Hạn sử dụng (Shelf Life)', value: '18 tháng kể từ ngày nhập' },
          { label: 'Trạng thái kiểm định', value: 'Đạt chuẩn 100% (Inspection Lot Accepted)' }
        ]
      },
      {
        stepNumber: 3,
        stepName: 'Đối Chiếu Hóa Đơn 3 Bên & Ghi Nhận Công Nợ (3-Way Invoice Matching)',
        role: 'Kế toán Công nợ Phải trả / AP Accountant',
        fioriApp: 'Create Supplier Invoice (Fiori F0859)',
        tCode: 'MIRO',
        descriptionVi: 'Đối chiếu số lượng và đơn giá giữa: (1) Đơn đặt hàng PO, (2) Phiếu cân nhập kho GR thực tế và (3) Hóa đơn tài chính của nhà cung cấp. Nếu sai lệch vượt ngưỡng 0.5%, hệ thống tự động khóa thanh toán.',
        documentGenerated: 'Hóa đơn mua hàng SAP Invoice: #5105600120',
        jouleAiAssistantRole: 'Joule tự động bóc tách mã tra cứu hóa đơn điện tử của nhà cung cấp, kiểm tra tính hợp lệ với Tổng Cục Thuế và điền sẵn form thanh toán.',
        accountingPostings: [
          {
            accountNumber: '338800 (Tất toán tài khoản trung gian GR/IR)',
            accountName: 'GR/IR Clearing Account Cleared',
            debitCredit: 'Nợ (Debit)',
            amount: '650,000,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '133110 (Thuế GTGT đầu vào được khấu trừ)',
            accountName: 'Input VAT 8%',
            debitCredit: 'Nợ (Debit)',
            amount: '52,000,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '331100 (Phải trả người bán)',
            accountName: 'Accounts Payable Vendor',
            debitCredit: 'Có (Credit)',
            amount: '702,000,000 VND',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Kết quả đối chiếu 3 chiều', value: 'Khớp 100% - Không phát hiện sai lệch (Zero Variance)' },
          { label: 'Ngày đáo hạn thanh toán', value: '45 ngày theo thỏa thuận hợp đồng' }
        ]
      }
    ]
  },
  {
    id: 'pp-p2p-bj8',
    module: 'PP',
    scopeItemCode: 'BJ8',
    titleVi: 'Quy trình Lập kế hoạch Sản xuất & Tính Giá thành (Plan-to-Produce)',
    titleEn: 'Production Planning with MRP Live & Actual Product Costing (CO-PC)',
    businessContextVi: 'Dựa trên dự báo nhu cầu bán hàng và các đơn đặt hàng hiện hữu, hệ thống chạy thuật toán MRP Live trên in-memory HANA trong vài giây để sinh Lệnh sản xuất 10,000 chai nước tăng lực, tự động xuất kho nguyên vật liệu và kết chuyển giá thành chi tiết từng sản phẩm.',
    businessBenefitVi: 'Tăng tốc độ chạy kế hoạch sản xuất gấp 10 lần nhờ MRP Live; kiểm soát chi phí thực tế (NVL trực tiếp, nhân công, chi phí máy) so sánh với định mức chuẩn trong thời gian thực.',
    targetIndustries: ['Chế biến thực phẩm & Đồ uống', 'Dược phẩm', 'Cơ khí chính xác'],
    steps: [
      {
        stepNumber: 1,
        stepName: 'Chạy Lập Kế Hoạch Nhu Cầu Vật Tư (Run MRP Live)',
        role: 'Chuyên viên Kế hoạch Sản xuất / Production Planner',
        fioriApp: 'Monitor Material Coverage (Fiori F2101)',
        tCode: 'MD01N (MRP Live on HANA)',
        descriptionVi: 'Thuật toán tự động phân rã Định mức nguyên vật liệu (Bill of Materials - BOM) và Quy trình công nghệ (Routing) để phát hiện vật tư thiếu hụt và tạo lệnh sản xuất gợi ý.',
        documentGenerated: 'Kế hoạch sản xuất: #PL-2026-0391',
        jouleAiAssistantRole: 'Joule tự động cân đối năng lực máy móc theo ca kíp, khuyến nghị dời lịch bảo trì thiết bị để không gây trễ đơn hàng gấp.',
        sampleData: [
          { label: 'Sản phẩm đầu ra', value: 'ENERGY-DRINK-CAN-250ML (Thành phẩm Nước tăng lực)' },
          { label: 'Số lượng sản xuất', value: '10,000 Chai' },
          { label: 'Thời gian chạy MRP', value: '1.8 giây trên nền tảng SAP HANA in-memory' }
        ]
      },
      {
        stepNumber: 2,
        stepName: 'Ban Hành & Xuất Kho Sản Xuất (Production Order Release & GI)',
        role: 'Quản đốc Phân xưởng & Kế toán Chi phí',
        fioriApp: 'Manage Production Orders (Fiori F3968)',
        tCode: 'CO01 / CO02 / MIGO 261',
        descriptionVi: 'Phát lệnh sản xuất tới chuyền và tự động xuất kho nguyên liệu (Hương liệu, đường, vỏ lon, CO2) theo Movement Type 261.',
        documentGenerated: 'Số Lệnh sản xuất: #10008451',
        jouleAiAssistantRole: 'Joule theo dõi cảm biến IoT tại chuyền sản xuất để cảnh báo sớm nếu tỷ lệ tiêu hao đường vượt quá định mức 2%.',
        accountingPostings: [
          {
            accountNumber: '621000 (Chi phí NVL trực tiếp cho sản xuất)',
            accountName: 'Raw Materials Consumed in Production',
            debitCredit: 'Nợ (Debit)',
            amount: '68,500,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '152100 (Nguyên vật liệu tồn kho)',
            accountName: 'Raw Materials Inventory',
            debitCredit: 'Có (Credit)',
            amount: '68,500,000 VND',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Xưởng sản xuất (Work Center)', value: 'Chuyền đóng lon tự động Line 02' },
          { label: 'Movement Type', value: '261 (Goods issue for order)' }
        ]
      },
      {
        stepNumber: 3,
        stepName: 'Nhập Kho Thành Phẩm & Kết Chuyển Giá Thành (GR & Product Costing)',
        role: 'Kế toán Giá thành / Cost Controller',
        fioriApp: 'Post Goods Movement for Production Order (Fiori F1077)',
        tCode: 'CO11N / MIGO 101 / CK40N',
        descriptionVi: 'Xác nhận hoàn thành sản lượng (Confirmation), nhập kho thành phẩm vào kho phân phối (Movement Type 101) và tính toán chi phí thực tế (Chi phí NVL + Nhân công 622 + Chi phí máy 627).',
        documentGenerated: 'Phiếu nhập kho thành phẩm: #5000089120',
        jouleAiAssistantRole: 'Joule tự động lập bảng phân tích phương sai giá thành (Cost Variance Analysis): phân tích chênh lệch giá mua vs chênh lệch định mức tiêu hao.',
        accountingPostings: [
          {
            accountNumber: '155100 (Thành phẩm tồn kho)',
            accountName: 'Finished Goods Inventory',
            debitCredit: 'Nợ (Debit)',
            amount: '89,200,000 VND',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '154000 (Chi phí sản xuất kinh doanh dở dang)',
            accountName: 'Work-in-Process (WIP) Cleared',
            debitCredit: 'Có (Credit)',
            amount: '89,200,000 VND',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Giá thành đơn vị thực tế', value: '8,920 VND / chai (Định mức tiêu chuẩn: 9,100 VND)' },
          { label: 'Hiệu quả tiết kiệm chi phí', value: 'Tiết kiệm 180 VND/chai (-1.97% chi phí)' }
        ]
      }
    ]
  },
  {
    id: 'fico-r2r-bj5',
    module: 'FI-CO',
    scopeItemCode: 'BJ5',
    titleVi: 'Quy trình Kế toán Đa chuẩn mực & Đóng sổ Nhanh (Record-to-Report)',
    titleEn: 'Universal Journal (ACDOCA) with Parallel VAS & IFRS Reporting',
    businessContextVi: 'Doanh nghiệp FDI hoặc tập đoàn niêm yết tại Việt Nam cần lập báo cáo tài chính song song: Ledger 0L tuân thủ Thông tư 200/VAS của Bộ Tài Chính và Ledger 2L tuân thủ Chuẩn mực Quốc tế IFRS 15 / IFRS 16 trên cùng một chứng từ duy nhất.',
    businessBenefitVi: 'Loại bỏ hoàn toàn công việc nhập liệu thủ công 2 sổ kế toán riêng biệt; rút ngắn thời gian đóng sổ tài chính cuối tháng từ 10 ngày xuống còn 24 giờ với công cụ SAP Advanced Financial Closing.',
    targetIndustries: ['Doanh nghiệp FDI', 'Tập đoàn đa ngành', 'Ngân hàng & Định chế tài chính'],
    steps: [
      {
        stepNumber: 1,
        stepName: 'Hạch Toán Song Song Trên Bảng Sổ Cái Hợp Nhất (Universal Journal ACDOCA)',
        role: 'Kế toán Tổng hợp / General Ledger Accountant',
        fioriApp: 'Manage Journal Entries (Fiori F0717)',
        tCode: 'FB50 / FB01',
        descriptionVi: 'Mỗi chứng từ kế toán ghi nhận một lần duy nhất vào bảng ACDOCA. Các nguyên tắc ghi nhận khấu hao TSCĐ hoặc đánh giá lại ngoại tệ theo VAS và IFRS được tự động phân bổ vào từng Sổ con (Leading Ledger 0L và Non-Leading Ledger 2L).',
        documentGenerated: 'Chứng từ kế toán Universal Journal: #100004592',
        jouleAiAssistantRole: 'Joule tự động giải thích điểm khác biệt giữa bút toán VAS và IFRS cho kiểm toán viên nội bộ.',
        accountingPostings: [
          {
            accountNumber: '214100 (Hao mòn TSCĐ hữu hình)',
            accountName: 'Accumulated Depreciation - Fixed Assets',
            debitCredit: 'Có (Credit)',
            amount: '45,000,000 VND (VAS) / 52,000,000 VND (IFRS)',
            ledger: 'Cả hai'
          },
          {
            accountNumber: '642400 (Chi phí quản lý khấu hao)',
            accountName: 'Depreciation Expense Administration',
            debitCredit: 'Nợ (Debit)',
            amount: '45,000,000 VND (VAS) / 52,000,000 VND (IFRS)',
            ledger: 'Cả hai'
          }
        ],
        sampleData: [
          { label: 'Sổ cái Leading Ledger (0L)', value: 'Tuân thủ Chế độ Kế toán Doanh nghiệp Việt Nam (VAS / Thông tư 200)' },
          { label: 'Sổ cái Song song (2L)', value: 'Tuân thủ Chuẩn mực Báo cáo Tài chính Quốc tế (IFRS 16 Thuê tài sản)' },
          { label: 'Bảng cơ sở dữ liệu lõi', value: 'SAP ACDOCA (Single Source of Truth)' }
        ]
      },
      {
        stepNumber: 2,
        stepName: 'Quy Trình Đóng Sổ Tài Chính Tự Động (Advanced Financial Closing)',
        role: 'Kế toán trưởng & Giám đốc Tài chính (CFO)',
        fioriApp: 'SAP Advanced Financial Closing (Fiori F3148)',
        tCode: 'FAGL_FCV / FAGL_CL',
        descriptionVi: 'Hệ thống tự động kích hoạt 48 tác vụ đóng sổ theo chuỗi logic: trích trước chi phí, phân bổ chi phí gián tiếp (Overhead Assessment), đánh giá lại chênh lệch tỷ giá cuối kỳ và khóa sổ.',
        documentGenerated: 'Báo cáo Hoàn tất Đóng sổ Kỳ (Closing Checklist): Hoàn thành 100%',
        jouleAiAssistantRole: 'Joule AI kiểm tra toàn bộ số dư tài khoản tạm thời, tự động cảnh báo các bút toán bất thường hoặc hóa đơn chưa khớp trước giờ khóa sổ.',
        sampleData: [
          { label: 'Thời gian hoàn tất đóng sổ', value: '24 giờ (so với 8 ngày trước khi dùng SAP S/4HANA)' },
          { label: 'Tỷ lệ tự động hóa quy trình đóng sổ', value: '85% công việc được chạy tự động dưới nền (Background Job)' }
        ]
      }
    ]
  }
];
