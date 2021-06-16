<template>
    <div id="app">
        <vue-html2pdf
                :show-layout="controlValue.showLayout"
                :float-layout="controlValue.floatLayout"
                :enable-download="controlValue.enableDownload"
                :preview-modal="controlValue.previewModal"
                :filename="controlValue.filename"
                :paginate-elements-by-height="controlValue.paginateElementsByHeight"
                :pdf-quality="controlValue.pdfQuality"
                :pdf-format="controlValue.pdfFormat"
                :pdf-orientation="controlValue.pdfOrientation"
                :pdf-content-width="controlValue.pdfContentWidth"
                :manual-pagination="controlValue.manualPagination"
                :html-to-pdf-options="htmlToPdfOptions"
                @progress="onProgress($event)"
                @startPagination="startPagination()"
                @hasPaginated="hasPaginated()"
                @beforeDownload="beforeDownload($event)"
                @hasDownloaded="hasDownloaded($event)"
                ref="html2Pdf"
        >
            <div slot="pdf-content">
                <slot name="content"></slot>
            </div>

        </vue-html2pdf>
    </div>
</template>

<script>
    import VueHtml2pdf from 'vue-html2pdf'
    export default {
        name: "GenerateReport",
        components: {
            VueHtml2pdf,
        },
        data() {
            return {
                controlValue: {
                    showLayout: false,
                    floatLayout: true,
                    enableDownload: true,
                    previewModal: true,
                    paginateElementsByHeight: 1100,
                    manualPagination: false,
                    filename: 'Report',
                    pdfQuality: 2,
                    pdfFormat: 'a4',
                    pdfOrientation: 'portrait',
                    pdfContentWidth: '800px'
                }
            }
        },
        computed: {
            htmlToPdfOptions() {
                return {
                    margin: 0,

                    filename: "Report.pdf",

                    image: {
                        type: "jpeg",
                        quality: 0.98,
                    },

                    enableLinks: true,

                    html2canvas: {
                        scale: this.controlValue.pdfQuality,
                        useCORS: true,
                    },

                    jsPDF: {
                        unit: "in",
                        format: this.controlValue.pdfFormat,
                        orientation: this.controlValue.pdfOrientation,
                    },
                };
            },
        },
        methods: {
            async downloadPdf() {
                // if (!(await this.validateControlValue())) return;
            },

            validateControlValue() {
                if (this.controlValue.pdfQuality > 2) {
                    alert("pdf-quality value should only be 0 - 2");
                    this.controlValue.pdfQuality = 2;

                    return false;
                }

                if (!this.controlValue.paginateElementsByHeight) {
                    alert("paginate-elements-by-height value cannot be empty");
                    this.controlValue.paginateElementsByHeight = 1400;

                    return false;
                }

                const paperSizes = [
                    "a0",
                    "a1",
                    "a2",
                    "a3",
                    "a4",
                    "letter",
                    "legal",
                    "a5",
                    "a6",
                    "a7",
                    "a8",
                    "a9",
                    "a10",
                ];

                if (!paperSizes.includes(this.controlValue.pdfFormat)) {
                    alert(`pdf-format value should only be ${paperSizes}`);
                    this.controlValue.pdfFormat = "a4";

                    return false;
                }

                if (!this.controlValue.pdfOrientation) {
                    alert("pdf-orientation value cannot be empty");
                    this.controlValue.pdfOrientation = "portrait";

                    return false;
                }

                if (!this.controlValue.pdfContentWidth) {
                    alert("pdf-content-width value cannot be empty");
                    this.controlValue.pdfContentWidth = "800px";

                    return false;
                }

                return true;
            },

            onProgress(progress) {
                this.progress = progress;
                console.log(`PDF generation progress: ${progress}%`)
            },

            startPagination() {
                console.log(`PDF has started pagination`)
            },

            hasPaginated () {
                console.log(`PDF has been paginated`)
            },

            // eslint-disable-next-line no-unused-vars
            async beforeDownload ({ html2pdf, options, pdfContent }) {
                console.log(`On Before PDF Generation`)
                // await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                // 	const totalPages = pdf.internal.getNumberOfPages()
                // 	for (let i = 1; i <= totalPages; i++) {
                // 		pdf.setPage(i)
                // 		pdf.setFontSize(10)
                // 		pdf.setTextColor(150)
                // 		pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                // 	}
                // }).save()
            },

            hasDownloaded (blobPdf) {
                console.log(`PDF has downloaded yehey`)
                this.pdfDownloaded = true
                console.log(blobPdf)
            },

            domRendered() {
                console.log("Dom Has Rendered");
                this.contentRendered = true;
            },

            onBlobGenerate(blob) {
                console.log(blob);
            },
        },
        mounted() {
            let that = this
            this.$bus.on('generate-report', function () {
                that.$refs.html2Pdf.generatePdf();
            })
        }
    }
</script>

<style scoped>

</style>