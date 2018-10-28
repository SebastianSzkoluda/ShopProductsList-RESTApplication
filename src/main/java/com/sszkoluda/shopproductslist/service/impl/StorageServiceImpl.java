package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import com.sszkoluda.shopproductslist.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageServiceImpl implements StorageService {

    private final FamilyUserService familyUserService;

    private final FamilyUserRepository familyUserRepository;

    private final Path rootLocation = Paths.get("upload-dir");

    @Autowired
    public StorageServiceImpl(FamilyUserService familyUserService, FamilyUserRepository familyUserRepository) {
        this.familyUserService = familyUserService;
        this.familyUserRepository = familyUserRepository;
    }

    @Override
    public String store(MultipartFile file) {
        String filename = "default";

        try {
            FamilyUser familyUser = this.familyUserService.getCurrentUser().get();
            filename = familyUser.getUsername()+".jpg";
            familyUser.setAvatarFilename(filename);
            this.familyUserRepository.save(familyUser);
            Files.copy(file.getInputStream(),
                    this.rootLocation.resolve(filename),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }
        return filename;
    }

    @Override
    public Resource loadFile(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }
}
