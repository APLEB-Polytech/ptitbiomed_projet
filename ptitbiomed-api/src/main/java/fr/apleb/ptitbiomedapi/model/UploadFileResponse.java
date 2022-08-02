package fr.apleb.ptitbiomedapi.model;

public record UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size) {
}
